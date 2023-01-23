from locale import ABDAY_2
import sys
import glob
import serial
import json
import random
from pymavswarm.types import AgentID

def serial_ports():
    """ Lists serial port names

        :raises EnvironmentError:
            On unsupported or unknown platforms
        :returns:
            A list of the serial ports available on the system
    """
    if sys.platform.startswith('win'):
        ports = ['COM%s' % (i + 1) for i in range(256)]
    elif sys.platform.startswith('linux') or sys.platform.startswith('cygwin'):
        # this excludes your current terminal "/dev/tty"
        ports = glob.glob('/dev/tty[A-Za-z]*')
    elif sys.platform.startswith('darwin'):
        ports = glob.glob('/dev/tty.*')
    else:
        raise EnvironmentError('Unsupported platform')

    result = []
    for port in ports:
        try:
            s = serial.Serial(port)
            s.close()
            result.append(port)
        except (OSError, serial.SerialException):
            pass
    return result

def testAgents():
    numberOfAgents = random.randint(1,10)
    agents = []
    for agent in range(numberOfAgents):
        tempAgent = {
            "agentId": agent,
            "armstatus": "disarmed",
            "mode": "stabalize",
            "timeout": "false"
            }
        agents.append(tempAgent)

    return agents

def testAgent():
    agents = []
    agent = {
        "agentId": "13",
        "compId": "1",
        "armStatus": True,
        "mode": "STABILIZE",
        "timeout": "false",
        "latitude": 40.8467,
        "longitude": -96.4717,
        "altitude": 60
    }
    agents.append(agent)
    agent = {
        "agentId": "5",
        "compId": "1",
        "armStatus": False,
        "mode": "GUIDED",
        "timeout": "true",
        "latitude": 40.8468,
        "longitude": -96.4716,
        "altitude": 42.0
    }
    agents.append(agent)
    agent = {
        "agentId": "4",
        "compId": "2",
        "armStatus": False,
        "mode": "AUTO",
        "timeout": "true",
        "latitude": 40.8468,
        "longitude": -96.4716,
        "altitude": 42.0
    }
    agents.append(agent)
    agent = {
        "agentId": "7",
        "compId": "2",
        "armStatus": False,
        "mode": "GUIDED",
        "timeout": "true",
        "latitude": 40.8466,
        "longitude": -96.4715,
        "altitude": 42.0
    }
    agents.append(agent)
    


    return agents

def convertAgentsToAgentID(listOfAgents):
    agentList =[]
    for id in listOfAgents:
        splitID = id.split('_')
        agentList.append(AgentID( [ int(splitID[0]) ,  int(splitID[1]) ] ))

    return agentList
