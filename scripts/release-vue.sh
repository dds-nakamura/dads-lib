#!/usr/bin/env bash
#
# release-vue.sh — @dads/vue を vue-pkg ブランチへリリースする
#
# Usage:
#   ./scripts/release-vue.sh <version>
#
# Example:
#   ./scripts/release-vue.sh 0.1.0
#
# 動作概要:
#   1. packages/vue/ をビルド
#   2. dist / src/styles / package.json / README.md / LICENSE を一時ディレクトリにステージング
#   3. リポジトリを一時 clone し、そこで vue-pkg orphan ブランチをチェックアウト
#      (無ければ初回として orphan ブランチを新規作成)
#   4. vue-pkg ブランチの中身をステージング内容で全置換 → commit
#   5. vue-v<version> tag を打って origin に push
#
# main ブランチには dist を一切コミットしないため、開発履歴の差分はクリーンに保たれる。
# 利用側は: npm install "git+ssh://...dads-lib.git#vue-v<version>"

set -euo pipefail

# ---------- args ----------
VERSION="${1:-}"
if [[ -z "${VERSION}" ]]; then
  echo "Usage: $0 <version>" >&2
  echo "Example: $0 0.1.0" >&2
  exit 1
fi

TAG="vue-v${VERSION}"
BRANCH="vue-pkg"
PKG_DIR="packages/vue"
ROOT_DIR="$(git rev-parse --show-toplevel)"

cd "${ROOT_DIR}"

# ---------- pre-flight checks ----------
if [[ ! -d "${PKG_DIR}" ]]; then
  echo "Error: ${PKG_DIR} not found (must run from a dads-lib checkout)." >&2
  exit 1
fi

ORIGIN_URL="$(git remote get-url origin 2>/dev/null || true)"
if [[ -z "${ORIGIN_URL}" ]]; then
  echo "Error: no 'origin' remote configured." >&2
  exit 1
fi

# Tag must not exist locally or remotely
if git rev-parse "refs/tags/${TAG}" >/dev/null 2>&1; then
  echo "Error: tag ${TAG} already exists locally." >&2
  exit 1
fi
if git ls-remote --tags origin "refs/tags/${TAG}" 2>/dev/null | grep -q "${TAG}"; then
  echo "Error: tag ${TAG} already exists on origin." >&2
  exit 1
fi

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
TMP_CLONE="$(mktemp -d -t dads-vue-clone.XXXXXX)/release-clone"

cleanup() {
  rm -rf "${STAGE_DIR}" "$(dirname "${TMP_CLONE}")"
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

# ---------- clone into temp & switch to vue-pkg ----------
echo "==> Cloning into temp dir (isolated from your working tree)..."
git clone --quiet "${ROOT_DIR}" "${TMP_CLONE}"
cd "${TMP_CLONE}"
git remote set-url origin "${ORIGIN_URL}"
git fetch --quiet origin

if git ls-remote --heads origin "${BRANCH}" 2>/dev/null | grep -q "${BRANCH}"; then
  echo "==> Checking out existing ${BRANCH} branch from origin..."
  git fetch origin "${BRANCH}:${BRANCH}" --quiet
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

echo "==> Pushing ${BRANCH} and ${TAG} to origin..."
git push origin "${BRANCH}" "${TAG}"

# ---------- bring tag back to user's repo ----------
cd "${ROOT_DIR}"
git fetch --quiet origin "refs/tags/${TAG}:refs/tags/${TAG}" || true

cat <<EOF

✓ Released ${TAG}

Consumers install with:
  npm install "git+ssh://<space>@<space>.git.backlog.com:/<PROJ>/dads-lib.git#${TAG}"

To list all releases:
  git ls-remote --tags origin 'vue-v*'
EOF
