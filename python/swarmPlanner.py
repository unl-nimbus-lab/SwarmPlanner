# Python 3 server example
from http.server import BaseHTTPRequestHandler, HTTPServer
from operator import length_hint
import os
import time
import socketserver
from helperFunctions import *
import json
import cgi
import sys
import subprocess
import shlex


from pymavswarm import MavSwarm
from pymavswarm.types import AgentID
from pymavswarm import Agent


mavswarm = MavSwarm()

path = "/dev"
dir_list = os.listdir(path)

hostName = "127.0.0.1"
serverPort = 8080

class MyServer(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json') 
        self.send_header('Access-Control-Allow-Origin','*')
        self.send_header('Access-Control-Allow-Credentials','true')
        self.end_headers()

    def do_GET(self):
        self._set_headers()

        splitURL = self.path.split('/')
        
        command = splitURL[1]

        match command:
            case 'update_connection_data':
                swarmData = []
                if (mavswarm.connected):
                    swarmData.append({"Connected": "true"})
                else:
                    swarmData.append({"Connected": "false"})
                
                jSwarm = json.dumps(swarmData)
                self.wfile.write(bytes(jSwarm,encoding='utf8'))

            case 'update_agents':
                agentInfo = []
                #generate random fake agents for easy testing
                #agentInfo = testAgent()

                for agent in mavswarm.agents:
                    tempAgent = {
                        "agentId": str(agent.system_id),
                        "compId": str(agent.component_id),
                        "armStatus": agent.armed.value,
                        "mode": agent.mode.value,
                        "timeout": agent.timeout.value,
                        "latitude": agent.position.global_frame.x,
                        "longitude": agent.position.global_frame.y,
                        "altitude": agent.position.global_frame.z
                    }
                    agentInfo.append(tempAgent)
                    
                    #use these for gps shite --Dont delete, just keep this here for reference
                    # print((agent.position.global_frame.x))
                    # print((agent.position.global_frame.y))
                    # print((agent.position.global_frame.z))

                jagents = json.dumps(agentInfo)
                self.wfile.write(bytes(jagents,encoding='utf8'))

            case 'update_connection_list':
                devices = []
                availbledevices = serial_ports()
                for device in availbledevices:
                    devices.append({"Device": device})

                jDevices = json.dumps(devices)
                self.wfile.write(bytes(jDevices,encoding='utf8'))

            case 'connect_to':

                if (splitURL[2] == "UDP"):
                    #FOUND A UDP PORT
                    baudrate = "57600" #This doesn't matter but pymavswarm will bitch without it
                    url = splitURL[3]
                    print(url)
                elif (splitURL[2] == "TCP"):
                    #FOUND A TCP PORT
                    baudrate = "57600" #This doesn't matter but pymavswarm will bitch without it
                    url = splitURL[3]
                    print(url)
                else:
                    deviceLocation = splitURL[2]
                    deviceName = splitURL[3]
                    baudrate = splitURL[4]
                    url =  '/' + deviceLocation + '/' + deviceName
                print('Connecting to ' + url + " at " + baudrate + " baud ...")
                mavswarm.connect(url, baudrate, 255, 0)

            case 'disconnect':
                mavswarm.disconnect()

            case 'arm':
                if len(splitURL) == 2: 
                    mavswarm.arm()
                else:
                    agents_to_work = splitURL[2:]
                    agentsToArm = convertAgentsToAgentID(agents_to_work)
                    mavswarm.arm(agentsToArm)
                    # agentsToArm = []
                    # for i in range( 2, (len(splitURL))):
                    #     barf = splitURL[i].split("_")
                    #     agentsToArm.append( AgentID( [ int(barf[0]) ,  int(barf[1]) ] ))
                    
                    # mavswarm.arm(agentsToArm)
                    # thang = AgentID([5,1])
                    # thangsToArm = [thang]
                    #print(thangsToArm)
                    #print(agentsToArm)
                    #thang1 = AgentID( splitURL[2] )
                    #thang2 = AgentID( [5,1]  )

                    #mavswarm.arm( [thang1] )

                #Need to try with 2
                #thang = AgentID([5,1])
                #print("arming")
                #agentsToArm = []
                #mavswarm.arm(agentsToArm)

            case 'disarm':
                if len(splitURL) == 2: 
                    mavswarm.disarm()
                else:
                    agents_to_work = splitURL[2:]
                    agentsToDisarm = convertAgentsToAgentID(agents_to_work)
                    mavswarm.disarm(agentsToDisarm)
            
            case 'set_mode':
                mode = splitURL[2]
                match mode:
                    case 'STABILIZE':
                        if len(splitURL) == 3: 
                            future = mavswarm.set_mode("STABILIZE")
                            while not future.done():
                                pass
                        else:
                            agents_to_work = splitURL[3:]
                            agentsToLand = convertAgentsToAgentID(agents_to_work)
                            future = mavswarm.set_mode("STABILIZE",agentsToLand)
                            while not future.done():
                                pass
                    case 'ALT_HOLD':
                        if len(splitURL) == 3: 
                            future = mavswarm.set_mode("ALT_HOLD")
                            while not future.done():
                                pass
                        else:
                            agents_to_work = splitURL[3:]
                            agentsToLand = convertAgentsToAgentID(agents_to_work)
                            future = mavswarm.set_mode("ALT_HOLD",agentsToLand)
                            while not future.done():
                                pass
                    case 'LOITER':
                        if len(splitURL) == 3: 
                            future = mavswarm.set_mode("LOITER")
                            while not future.done():
                                pass
                        else:
                            agents_to_work = splitURL[3:]
                            agentsToLand = convertAgentsToAgentID(agents_to_work)
                            future = mavswarm.set_mode("LOITER",agentsToLand)
                            while not future.done():
                                pass
                    case 'GUIDED':
                        if len(splitURL) == 3: 
                            future = mavswarm.set_mode("GUIDED")
                            while not future.done():
                                pass
                        else:
                            agents_to_work = splitURL[3:]
                            agentsToLand = convertAgentsToAgentID(agents_to_work)
                            future = mavswarm.set_mode("GUIDED",agentsToLand)
                            while not future.done():
                                pass
                    case 'AUTO':
                        if len(splitURL) == 3: 
                            future = mavswarm.set_mode("AUTO")
                            while not future.done():
                                pass
                        else:
                            agents_to_work = splitURL[3:]
                            agentsToLand = convertAgentsToAgentID(agents_to_work)
                            future = mavswarm.set_mode("AUTO",agentsToLand)
                            while not future.done():
                                pass
                    case 'LAND':
                        if len(splitURL) == 3: 
                            future = mavswarm.set_mode("LAND")
                            while not future.done():
                                pass
                        else:
                            agents_to_work = splitURL[3:]
                            agentsToLand = convertAgentsToAgentID(agents_to_work)
                            future = mavswarm.set_mode("LAND",agentsToLand)
                            while not future.done():
                                pass
                    case 'RTL':
                        if len(splitURL) == 3: 
                            future = mavswarm.set_mode("RTL")
                            while not future.done():
                                pass
                        else:
                            agents_to_work = splitURL[3:]
                            agentsToLand = convertAgentsToAgentID(agents_to_work)
                            future = mavswarm.set_mode("RTL",agentsToLand)
                            while not future.done():
                                pass

                    case 'THROW':
                        if len(splitURL) == 3: 
                            future = mavswarm.set_mode("THROW")
                            while not future.done():
                                pass
                        else:
                            agents_to_work = splitURL[3:]
                            agentsToLand = convertAgentsToAgentID(agents_to_work)
                            future = mavswarm.set_mode("THROW",agentsToLand)
                            while not future.done():
                                pass
                    case _:
                        print('you did not send a valid flightmode')
            
            case 'takeoff':
                if (len(splitURL) == 3):
                    #case: all
                    altitude = float(splitURL[2])
                    future = mavswarm.takeoff(altitude)
                    while not future.done():
                        pass
                else:
                    #case: selected
                    agents_to_work = splitURL[2::2]
                    altitude = float(splitURL[3::2])
                    agentsToTakeoff = convertAgentsToAgentID(agents_to_work)
                    future = mavswarm.takeoff(altitude,agentsToTakeoff)

            case 'debug_vector':
                match (len(splitURL)):
                    case 3:
                        #Just the name and default values
                        mavswarm.send_debug_message(splitURL[2],[0,0,0])
                    case 4:
                        x = float(splitURL[3])
                        mavswarm.send_debug_message(splitURL[2],[x,0,0])
                    case 5:
                        x = float(splitURL[3])
                        y = float(splitURL[4])
                        mavswarm.send_debug_message(splitURL[2],[x,y,0])
                    case 6:
                        x = float(splitURL[3])
                        y = float(splitURL[4])
                        z = float(splitURL[5])
                        mavswarm.send_debug_message(splitURL[2],[x,y,z])
                    case _:
                        print('Vector is too big')
           
            case 'generate_compose':
                
                #Parse information from http request
                agent_count = splitURL[2]
                gazebo =  splitURL[3]
                gazebo_absolute_path = splitURL[4]
                companion_process = splitURL[5]
                specific_compainion = splitURL[6] + " " + splitURL[7]

                # Change the working directory to the directory containing the Python script you want to run and location to python3
                script_dir = '/home/landenf/uav_simulator/swarm_simulator/'
                python_dir = '/home/landenf/anaconda3/envs/pymavswarm/bin/python3'

                #Generate and print command
                cmd = "%s generate_compose.py %s %s %s %s %s" % (python_dir, agent_count, gazebo, gazebo_absolute_path, companion_process, specific_compainion)
                print("RUNNNING: " + cmd)

                #Generate compose file using subprocessing
                subprocess.run(shlex.split(cmd), cwd=script_dir)
                
            case _:
                print('you did not send a valid command')
                             
if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")

    