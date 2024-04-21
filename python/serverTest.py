import json
from http.server import HTTPServer, BaseHTTPRequestHandler

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(b"This is thing A - responding to a GET request")

    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-Type', 'text/html')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        
        content_length = int(self.headers['Content-Length'])  # Get the size of data
        post_data = self.rfile.read(content_length)  # Read the data

        try:
            data = json.loads(post_data.decode('utf-8'))  # Decode and parse the JSON data
            print("Received POST data:", data)  # Print the received data

            self.send_response(200)
            self.send_header('Content-type', 'text/html')
            self.end_headers()
            self.wfile.write(b"Received POST data, check server console for details.")

        except json.JSONDecodeError as e:
            print("Error decoding JSON:", e)
            self.send_error(400, "Invalid JSON")
        except UnicodeDecodeError as e:
            print("Error decoding byte data to string:", e)
            self.send_error(400, "Bad encoding")
        
    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()


def run(server_class=HTTPServer, handler_class=SimpleHTTPRequestHandler):
    server_address = ('', 8080)  # Run on localhost, port 8000
    httpd = server_class(server_address, handler_class)
    print("Server running on port 8080...")
    httpd.serve_forever()

if __name__ == '__main__':
    run()