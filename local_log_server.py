import http.server
import socketserver
import json
import os
from datetime import datetime

PORT = 8080
LOG_FILE = "chrome_console.log"

class LogRequestHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/log':
            try:
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                log_entry = json.loads(post_data.decode('utf-8'))

                # Print to console
                print(f"[{log_entry.get('timestamp', '')}] [{log_entry.get('type', 'log').upper()}] {log_entry.get('message', '')}")

                # Append to log file
                with open(LOG_FILE, "a", encoding='utf-8') as f:
                    f.write(json.dumps(log_entry) + '\n')

                self.send_response(200)
                self.end_headers()
                self.wfile.write(b'OK')
            except Exception as e:
                print(f"Error processing request: {e}")
                self.send_response(500)
                self.end_headers()
                self.wfile.write(f"Internal Server Error: {e}".encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'Not Found')

    # Quieten down the default logging of GET/HEAD requests
    def log_message(self, format, *args):
        if self.command == 'POST': # Only log our POST requests
             super().log_message(format, *args)

# Ensure the log file exists
if not os.path.exists(LOG_FILE):
    with open(LOG_FILE, "w") as f:
        f.write("") # Create empty file

with socketserver.TCPServer(("", PORT), LogRequestHandler) as httpd:
    print(f"Serving HTTP on port {PORT}...")
    print(f"Logs will be printed here and saved to {LOG_FILE}")
    httpd.serve_forever() 