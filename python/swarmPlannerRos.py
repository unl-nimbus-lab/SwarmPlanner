# Python 3 server example
from http.server import BaseHTTPRequestHandler, HTTPServer
from operator import length_hint
import os
import time
import socketserver

import json
import cgi
import sys
import subprocess
import shlex


path = "/dev"
dir_list = os.listdir(path)

hostName = "127.0.0.1"
serverPort = 8080
postPort = 8081

class MyServer(BaseHTTPRequestHandler):
    # def _set_headers(self):
    #     self.send_response(200)
    #     self.send_header('Content-type', 'application/json') 
    #     self.send_header('Access-Control-Allow-Origin','*')
    #     self.send_header('Access-Control-Allow-Credentials','true')
    #     self.end_headers()

    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        splitURL = self.path.split('/')
    
    # def do_POST(self):
    #     self.send_response(200)
    #     self.send_header('Content-Type', 'text/html')
    #     self.send_header('Access-Control-Allow-Origin', '*')
    #     self.end_headers()
        
    #     content_length = int(self.headers['Content-Length'])  # Get the size of data
    #     post_data = self.rfile.read(content_length)  # Read the data

    #     try:
    #         data = json.loads(post_data.decode('utf-8'))  # Decode and parse the JSON data
    #         print("Received POST data:", data)  # Print the received data

    #         #First Determine if we are using gazebo
    #         if data['gazebo'] == 'TRUE':
    #             numberOfModels = len(data['gazeboAgents'])

    #             for model in data['gazeboAgents']:
    #                 #Generate the command to start the gazebo simulator
    #                 print(model)
    #                 generateVehicleModel( int(model['id']),'./uav_simulator/swarm_simulator/simulator_generated_files/generated_models/','./python/model_generate/templates/','iris',['rotor','arduPilot'])

    #         generateWorld("./uav_simulator/swarm_simulator/simulator_generated_files/vehicle_worlds/", "./python/world_generate/templates", "./uav_simulator/swarm_simulator/simulator_generated_files/generated_models")
       

    #         composeCommand = generateComposeCommand(data)
    #         subprocess.run(composeCommand)

    #         self.send_response(200)
    #         self.send_header('Content-type', 'text/html')
    #         self.end_headers()
    #         self.wfile.write(b"Received POST data, check server console for details.")
    #     except json.JSONDecodeError as e:
    #         print("Error decoding JSON:", e)
    #         self.send_error(400, "Invalid JSON")
    #     except UnicodeDecodeError as e:
    #         print("Error decoding byte data to string:", e)
    #         self.send_error(400, "Bad encoding")

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def run(server_class=HTTPServer, handler_class=MyServer):
    server_address = ('', 8080)  # Run on localhost, port 8000
    httpd = server_class(server_address, handler_class)
    print("Server running on port 8080...")
    httpd.serve_forever()

if __name__ == "__main__":        
    # webServer = HTTPServer((hostName, serverPort), MyServer)
    # print("Server started http://%s:%s" % (hostName, serverPort))

    # try:
    #     webServer.serve_forever()
    # except KeyboardInterrupt:
    #     pass

    # webServer.server_close()
    # print("Server stopped.")
    run()
