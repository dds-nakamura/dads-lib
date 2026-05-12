#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")"

PORT="${PORT:-8765}"
HOST="${HOST:-127.0.0.1}"
PID_FILE=".server.pid"
LOG_FILE=".server.log"

if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  echo "サーバは既に起動中です (PID: $(cat "$PID_FILE"))"
  echo "URL: http://${HOST}:${PORT}/dads/"
  exit 0
fi

nohup python3 -m http.server "$PORT" --bind "$HOST" > "$LOG_FILE" 2>&1 &
echo $! > "$PID_FILE"

sleep 1

if kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  echo "サーバ起動 (PID: $(cat "$PID_FILE"))"
  echo "URL: http://${HOST}:${PORT}/dads/"
  echo "ログ: $LOG_FILE"
  echo "停止: ./stop-server.sh"
else
  echo "サーバ起動失敗。ログを確認してください: $LOG_FILE"
  rm -f "$PID_FILE"
  exit 1
fi
