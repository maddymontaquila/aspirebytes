from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import os


HOST = "localhost"
PORT = int(os.environ.get("PORT", 8000))

SALES_DATA = [
    {"product": "Coffee", "unitsSold": 128, "revenue": 512},
    {"product": "Tea", "unitsSold": 96, "revenue": 336},
    {"product": "Cookies", "unitsSold": 74, "revenue": 222},
]


class ApiHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(204)
        self._send_cors_headers()
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/sales":
            self._send_json({"sales": SALES_DATA})
            return

        if self.path == "/api/health":
            self._send_json({"status": "ok"})
            return

        self.send_error(404, "Not found")

    def _send_json(self, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(200)
        self._send_cors_headers()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _send_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")


if __name__ == "__main__":
    server = HTTPServer((HOST, PORT), ApiHandler)
    print(f"Python API running at http://{HOST}:{PORT}")
    server.serve_forever()
