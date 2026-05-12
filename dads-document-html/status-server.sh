#!/bin/bash
set -euo pipefail

cd "$(dirname "$0")"

PORT="${PORT:-8765}"
HOST="${HOST:-127.0.0.1}"
PID_FILE=".server.pid"

if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
  echo "稼働中 (PID: $(cat "$PID_FILE"))"
  echo "URL: http://${HOST}:${PORT}/dads/"
else
  echo "停止中"
fi
