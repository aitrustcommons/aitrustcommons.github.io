#!/bin/bash
# Start, stop or check the local preview of the built site (astro preview).
# usage: scripts/preview-server.sh start|stop|status
# Serves dist/ at http://localhost:4321/. Run "npm run build" first.
# Keeps a PID file and a log under .preview/, and frees the port on stop.
set -euo pipefail
cd "$(dirname "$0")/.."
PORT=4321
DIR=.preview
PIDFILE=$DIR/server.pid
LOG=$DIR/server.log
mkdir -p "$DIR"

running() { [ -f "$PIDFILE" ] && kill -0 "$(cat "$PIDFILE")" 2>/dev/null; }

sweep() {
  local pids
  pids=$(lsof -ti tcp:$PORT 2>/dev/null || true)
  [ -n "$pids" ] && kill $pids 2>/dev/null || true
}

case "${1:-status}" in
  start)
    if running; then echo "already running (pid $(cat "$PIDFILE")) at http://localhost:$PORT/"; exit 0; fi
    sweep
    nohup npx astro preview --port $PORT >"$LOG" 2>&1 &
    echo $! >"$PIDFILE"
    for _ in $(seq 1 40); do
      curl -s -o /dev/null "http://localhost:$PORT/" && { echo "running at http://localhost:$PORT/ (pid $(cat "$PIDFILE"), log $LOG)"; exit 0; }
      sleep 0.25
    done
    echo "did not start; see $LOG"; exit 1 ;;
  stop)
    running && kill "$(cat "$PIDFILE")" 2>/dev/null || true
    rm -f "$PIDFILE"; sweep; echo "stopped" ;;
  status)
    running && echo "running at http://localhost:$PORT/ (pid $(cat "$PIDFILE"))" || echo "not running" ;;
  *) echo "usage: $0 start|stop|status"; exit 1 ;;
esac
