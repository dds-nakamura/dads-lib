#!/usr/bin/env bash
#
# release-vue.sh — @dads/vue を vue-pkg ブランチへリリースする
#
# Usage:
#   ./scripts/release-vue.sh <version> [remotes]
#
# Example:
#   ./scripts/release-vue.sh 0.1.0                  # origin にのみ push (従来動作)
#   ./scripts/release-vue.sh 0.1.0 origin           # 明示
#   ./scripts/release-vue.sh 0.1.0 origin,backlog   # GitHub + Backlog 両方に push
#
# 動作概要:
#   1. packages/vue/ をビルド
#   2. dist / src/styles / package.json / README.md / LICENSE を一時ディレクトリにステージング
#   3. リポジトリを一時 clone し、そこで vue-pkg orphan ブランチをチェックアウト
#      (無ければ初回として orphan ブランチを新規作成)
#   4. vue-pkg ブランチの中身をステージング内容で全置換 → commit
#   5. vue-v<version> tag を打って指定された全 remote に push
#
# main ブランチには dist を一切コミットしないため、開発履歴の差分はクリーンに保たれる。
# 利用側は: npm install "git+https://github.com/<owner>/dads-lib.git#vue-v<version>"
#         または "git+ssh://...backlog.com:/<proj>/dads-lib.git#vue-v<version>"

set -euo pipefail

# ---------- args ----------
VERSION="${1:-}"
REMOTES_ARG="${2:-origin}"

if [[ -z "${VERSION}" ]]; then
  echo "Usage: $0 <version> [remotes]" >&2
  echo "Example: $0 0.1.0" >&2
  echo "Example: $0 0.1.0 origin,backlog" >&2
  exit 1
fi

TAG="vue-v${VERSION}"
BRANCH="vue-pkg"
PKG_DIR="packages/vue"
ROOT_DIR="$(git rev-parse --show-toplevel)"

cd "${ROOT_DIR}"

# Parse comma-separated remote list into array
IFS=',' read -r -a REMOTES <<< "${REMOTES_ARG}"

# ---------- pre-flight checks ----------
if [[ ! -d "${PKG_DIR}" ]]; then
  echo "Error: ${PKG_DIR} not found (must run from a dads-lib checkout)." >&2
  exit 1
fi

# Resolve each remote's URL from the working repo and verify it exists
declare -A REMOTE_URLS=()
for r in "${REMOTES[@]}"; do
  url="$(git remote get-url "${r}" 2>/dev/null || true)"
  if [[ -z "${url}" ]]; then
    echo "Error: remote '${r}' is not configured (git remote add ${r} <url>)." >&2
    exit 1
  fi
  REMOTE_URLS["${r}"]="${url}"
done

# Tag must not exist locally
if git rev-parse "refs/tags/${TAG}" >/dev/null 2>&1; then
  echo "Error: tag ${TAG} already exists locally." >&2
  exit 1
fi

# Tag must not exist on any target remote
for r in "${REMOTES[@]}"; do
  if git ls-remote --tags "${r}" "refs/tags/${TAG}" 2>/dev/null | grep -q "${TAG}"; then
    echo "Error: tag ${TAG} already exists on remote '${r}'." >&2
    echo "Hint: 既存 tag を別 remote に後追い配布したい場合は:" >&2
    echo "      git push <remote> ${BRANCH} ${TAG}" >&2
    exit 1
  fi
done

# ---------- build ----------
echo "==> Building @dads/vue v${VERSION}..."
pnpm --filter @dads/vue run clean
pnpm --filter @dads/vue run build

if [[ ! -d "${PKG_DIR}/dist" ]]; then
  echo "Error: build did not produce ${PKG_DIR}/dist" >&2
  exit 1
fi

# ---------- stage release artifacts ----------
STAGE_DIR="$(mktemp -d -t dads-vue-stage.XXXXXX)"
TMP_CLONE_PARENT="$(mktemp -d -t dads-vue-clone.XXXXXX)"
TMP_CLONE="${TMP_CLONE_PARENT}/release-clone"

cleanup() {
  rm -rf "${STAGE_DIR}" "${TMP_CLONE_PARENT}"
}
trap cleanup EXIT

echo "==> Staging files to ${STAGE_DIR}"
mkdir -p "${STAGE_DIR}/src"
cp -R "${PKG_DIR}/dist" "${STAGE_DIR}/"
cp -R "${PKG_DIR}/src/styles" "${STAGE_DIR}/src/"
cp "${PKG_DIR}/package.json" "${STAGE_DIR}/"
[[ -f "${PKG_DIR}/README.md" ]] && cp "${PKG_DIR}/README.md" "${STAGE_DIR}/"
if [[ -f "${PKG_DIR}/LICENSE" ]]; then
  cp "${PKG_DIR}/LICENSE" "${STAGE_DIR}/"
elif [[ -f "LICENSE" ]]; then
  cp "LICENSE" "${STAGE_DIR}/"
fi

# ---------- clone into temp & configure remotes ----------
echo "==> Cloning into temp dir (isolated from your working tree)..."
git clone --quiet "${ROOT_DIR}" "${TMP_CLONE}"
cd "${TMP_CLONE}"

# Replace the default 'origin' (which points to ROOT_DIR) with the real remotes.
git remote remove origin 2>/dev/null || true
for r in "${REMOTES[@]}"; do
  git remote add "${r}" "${REMOTE_URLS[${r}]}"
done

# Fetch from all remotes (best effort)
for r in "${REMOTES[@]}"; do
  echo "==> Fetching from ${r}..."
  git fetch --quiet "${r}" || echo "  (warn) fetch from ${r} failed; continuing"
done

# Determine base: prefer existing vue-pkg from the first remote that has it.
PRIMARY_REMOTE=""
for r in "${REMOTES[@]}"; do
  if git ls-remote --heads "${r}" "${BRANCH}" 2>/dev/null | grep -q "${BRANCH}"; then
    PRIMARY_REMOTE="${r}"
    break
  fi
done

if [[ -n "${PRIMARY_REMOTE}" ]]; then
  echo "==> Checking out existing ${BRANCH} branch from ${PRIMARY_REMOTE}..."
  git fetch "${PRIMARY_REMOTE}" "${BRANCH}:${BRANCH}" --quiet
  git checkout --quiet "${BRANCH}"
else
  echo "==> First release: creating orphan branch ${BRANCH}"
  git checkout --quiet --orphan "${BRANCH}"
fi

# Remove all tracked files (keep .git)
git rm -rf --quiet . >/dev/null 2>&1 || true
# Also remove any untracked leftovers
find . -mindepth 1 -maxdepth 1 ! -name '.git' -exec rm -rf {} +

# ---------- copy staged files ----------
echo "==> Copying staged files into ${BRANCH}"
cp -R "${STAGE_DIR}/." ./

# ---------- commit, tag, push ----------
git add -A
if git diff --cached --quiet; then
  echo "Error: nothing to commit (rebuild produced identical output?)." >&2
  exit 1
fi

git commit --quiet -m "release: @dads/vue v${VERSION}"
git tag "${TAG}"

# Push to each target remote; track failures for final summary
SUCCEEDED=()
FAILED=()
for r in "${REMOTES[@]}"; do
  echo "==> Pushing ${BRANCH} and ${TAG} to ${r}..."
  if git push "${r}" "${BRANCH}" "${TAG}"; then
    SUCCEEDED+=("${r}")
  else
    FAILED+=("${r}")
    echo "  (error) push to ${r} failed; continuing with remaining remotes"
  fi
done

# ---------- bring tag back to user's repo ----------
cd "${ROOT_DIR}"
if [[ ${#SUCCEEDED[@]} -gt 0 ]]; then
  git fetch --quiet "${SUCCEEDED[0]}" "refs/tags/${TAG}:refs/tags/${TAG}" || true
fi

# ---------- summary ----------
echo
echo "✓ Released ${TAG}"
echo
echo "Push results:"
for r in "${SUCCEEDED[@]}"; do
  echo "  ✓ ${r}  (${REMOTE_URLS[${r}]})"
done
for r in "${FAILED[@]}"; do
  echo "  ✗ ${r}  (${REMOTE_URLS[${r}]})  — failed"
done

cat <<EOF

Consumers install with one of:
  # GitHub (public)
  npm install "git+https://github.com/<owner>/dads-lib.git#${TAG}"

  # Backlog Git (social)
  npm install "git+ssh://<space>@<space>.git.backlog.com:/<PROJ>/dads-lib.git#${TAG}"

To list all releases:
  git ls-remote --tags ${SUCCEEDED[0]:-<remote>} 'vue-v*'

To distribute an existing tag to a new remote later:
  git push <remote> ${BRANCH} ${TAG}
EOF

if [[ ${#FAILED[@]} -gt 0 ]]; then
  exit 1
fi
