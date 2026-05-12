#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")"

PID_FILE=".server.pid"

if [ ! -f "$PID_FILE" ]; then
  echo "PIDファイルなし。サーバは起動していません。"
  # ポートが残っている場合のフォールバック
  PORT="${PORT:-8765}"
  STRAY_PID=$(lsof -ti tcp:"$PORT" 2>/dev/null || true)
  if [ -n "$STRAY_PID" ]; then
    echo "ポート $PORT で稼働中のプロセスを検出 (PID: $STRAY_PID)。停止します。"
    kill "$STRAY_PID"
  fi
  exit 0
fi

PID=$(cat "$PID_FILE")

if kill -0 "$PID" 2>/dev/null; then
  kill "$PID"
  sleep 1
  if kill -0 "$PID" 2>/dev/null; then
    echo "通常停止失敗。強制終了します。"
    kill -9 "$PID"
  fi
  echo "サーバ停止 (PID: $PID)"
else
  echo "プロセス $PID は既に終了済み。"
fi

rm -f "$PID_FILE"
