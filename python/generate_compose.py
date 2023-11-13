import sys
#Need some text here explaining what is going on ...

#Some global variables (Fight me)

#Flags for simulation options
useGazebo = False
useMavros = False

#Networking starting options
startingCommsPort = 5762
portIncrement = 10
startingMavrosPort = 14550
startingMavrosBind = 14555


#ArduPilot Image
defaultArduPilotImage = "ardupilot_docker"
defaultMavrosImage = "grantphllps/mavros_docker"

pathToParamFiles = "../uav_simulator/swarm_simulator/simulator_generated_files/param_files/"
pathToSimSettings = "../uav_simulator/swarm_simulator/simulator_generated_files/sitl_settings/"
pathToCompose = "../uav_simulator/swarm_simulator/"
pathToRouter = "../uav_simulator/swarm_simulator/simulator_generated_files/mavlink_router/"
pathToMavrosEnvs = "../uav_simulator/swarm_simulator/simulator_generated_files/mavros_envs/"

#####################
#Begin argument parse

numberOfArgs = len(sys.argv)

if (numberOfArgs <= 6):
    print(helpMsg)
    sys.exit("Error: not enough arguments provided ")

numberOfCopters = int(sys.argv[1])
numberOfHelicopters = int(sys.argv[2])
numberOfBlimps = int(sys.argv[3])
numberOfPlanes = int(sys.argv[4])
numberOfRovers = int(sys.argv[5])
numberOfSubs = int(sys.argv[6])

print("Building for " + str(numberOfCopters) + " copters")
print("Building for " + str(numberOfHelicopters) + " helicopters")
print("Building for " + str(numberOfBlimps) + " blimps")
print("Building for " + str(numberOfPlanes) + " planes")
print("Building for " + str(numberOfRovers) + " rovers")
print("Building for " + str(numberOfSubs) + " subs")

numberOfVehicles = numberOfCopters + numberOfHelicopters + numberOfBlimps + numberOfPlanes + numberOfRovers + numberOfSubs

if numberOfArgs > 6:
    for i in range(7,numberOfArgs):
        if (sys.argv[i][0] != "-"): #Dont parse non "-" cli arguments
            sys.exit("Error: Unknown argument provided: " + sys.argv[i])
        else:
            match(sys.argv[i]):
                case "-g":
                    print("Building simulator for Gazebo")
                case "-m":
                    useMavros = True
                    print("Adding MAVROS")
                case "-s":
                    print("Using custom starting location")
                case "-l":
                    print("Logging Enabled")
                case "-h":
                    print(helpMsg)
                case _:
                    print(helpMsg)
                    sys.exit("Error: Unknown argument provided: " + sys.argv[i])


#End argument parse
#####################

###################################
#Begin Mavlink Router Configuration

#Generate the mavlink router file
mavlinkConfig = pathToRouter + "main.conf" #pathToSwarmSimulator + "/mavlink_router/main.conf"
f = open(mavlinkConfig,"w")

name = "[TcpServer Default]\n"
address = "Address = 0.0.0.0\n"
port = "Port = 5759\n\n"

f.writelines([name,address,port])

for i in range(1,numberOfVehicles + 1):
    name =      "[TcpEndpoint sitl_" + str(i) + "]\n"
    address =   "Address = 0.0.0.0\n"
    port =      "Port = " + str(startingCommsPort + i*portIncrement) + "\n\n"
    f.writelines([name,address,port])

#Add the main UPD connection
name =      "[UdpEndpoint omega]\n"
mode =      "Mode=Normal\n"
address =   "Address = 0.0.0.0\n"
port =      "Port = 4242\n\n"
f.writelines([name,mode,address,port])

#Add the secondary UPD connection
name =      "[UdpEndpoint collision]\n"
mode =      "Mode=Normal\n"
address =   "Address = 0.0.0.0\n"
port =      "Port = 4243\n"
f.writelines([name,mode,address,port])

f.close()

print("Mavlink router configuration generated successfully!")


#End Mavlink Router Configuration
###################################

####################################
#Begin Generate the MAVROS env files
for i in range(1,numberOfCopters + 1):
    filename = pathToMavrosEnvs + "/env" + str(i)
    f = open(filename,"w")
    port =              "PORT=udp://127.0.0.1:" + str(startingMavrosPort + (i)*portIncrement) + "@" + str(startingMavrosBind + (i)*10) + "\n"             #Same across all vehicles
    sysId =             "SYS_ID=" + str(i) + "\n"               #Different for each vehicle
    compId =            "COMP_ID=1\n"                           #Same across all vehicles
    f.writelines([port,sysId,compId])
    f.close()
#End Generate the MAVROS env files
##################################

####################################
#Begin SITL Default Copter Setttings

if (numberOfCopters > 0):
    for i in range(1,numberOfCopters+1):
        f = open(pathToSimSettings + "default_sim_settings_copter" + str(i),"w")
        lat =       "LAT=40.846\n"
        lon =       "LON=-96.471" + str(i) + "\n"
        alt =       "ALT=390\n"
        dir =       "DIR=0\n"
        model =     "MODEL=+\n"
        vehicle =   "VEHICLE=ArduCopter\n"
        f.writelines([lat,lon,alt,dir,model,vehicle])
        f.close()

print("Ardupilot env files generated sucessuflly!")

#End SITL Default Copter Setttings
##################################

#####################################
#Begin SITL Default Copter Parameters

if (numberOfCopters > 0):
    for i in range(1,numberOfCopters+1):
        f = open(pathToParamFiles + "default_params_copter" + str(i) + ".param","w")
        frameClass = "FRAME_CLASS\t1\n"
        frameType = "FRAME_TYPE\t1\n"
        sysId = "SYSID_THISMAV\t" + str(i) + "\n"
        SR0_POSITION = "SR0_POSITION\t5\n"
        SR1_POSITION = "SR1_POSITION\t5\n"
        SR0_POSITION = "SR2_POSITION\t5\n"
        f.writelines([frameClass,frameType,sysId,SR0_POSITION,SR1_POSITION,SR0_POSITION])
        f.close()

#End SITL Default Copter Parameters
###################################

#####################
#Begin docker-compose
#####################

f = open(pathToCompose + "docker-compose.yaml","w")
f.writelines(["version: '3'\n\n","services:\n"])

#####################
#Begin SITL for Copters
for i in range(1,numberOfCopters+1):
    var = str(i)
    #nvar = str(i-1)

    container =         "  sitl_" + var + ":\n"
    image =             "    image: " + defaultArduPilotImage + "\n"
    containerName =     "    container_name: sitl_" + var + "\n"
    network =           "    network_mode: host\n"
    volumes =           '    volumes:\n'
    envVol1 =           '      - ./simulator_generated_files/param_files:/root/home/param_files\n'
    envVol2 =           '      - ./simulator_generated_files/sitl_settings:/root/home/sitl_settings\n'
    command =           '    command: >\n'
    comman1 =           '      /bin/bash -c "export $$(cat /root/home/sitl_settings/default_sim_settings_copter' + var + ') &&\n'
    comman2 =           '                    /home/ardupilot/Tools/autotest/sim_vehicle.py --vehicle $${VEHICLE} -m --daemon -w --custom-location=$${LAT},$${LON},$${ALT},$${DIR} --no-rebuild -I' + var + ' --add-param-file=/root/home/param_files/default_params_copter' + var + '.param"\n'
    
    f.writelines([container,image,containerName,network,volumes,envVol1,envVol2,command,comman1,comman2,"\n"])

    if (useMavros == True):
        container =         "  mavros" + var + ":\n"
        depends =           "    depends_on:\n"
        depend1 =           "      - sitl_" + var + "\n"
        depend2 =           "      - mavlink_router\n"
        network =           "    network_mode: host\n"
        image =             "    image: " + defaultMavrosImage + "\n"
        containerName =     "    container_name: mavros_" + var + "\n"
        options1 =          "    stdin_open: true\n"
        options2 =          "    tty: true\n"
        volumes =           '    volumes:\n'
        envVol =            '      - ./simulator_generated_files/mavros_envs:/root/home/env_files\n'
        command =           '    command: >\n'
        comman1 =           '      /bin/bash -c "source /home/catkin_ws/devel/setup.bash &&\n'
        comman2 =           '                    export $$(cat /root/home/env_files/env' + var +')\n'
        if (i > 1):
            comman3 =           '                    roslaunch --wait mavros apm.launch fcu_url:=$${PORT} tgt_system:=$${SYS_ID} tgt_component:=$${COMP_ID}"\n'
        else: 
            comman3 =           '                    roslaunch mavros apm.launch fcu_url:=$${PORT} tgt_system:=$${SYS_ID} tgt_component:=$${COMP_ID}"\n'

        f.writelines([container,depends,depend1,depend2,network,image,containerName,options1,options2,volumes,envVol,command,comman1,comman2,comman3,"\n"])


#End SITL for Copters
#####################

#####################
#Begin Mavlink Router

container =         "  mavlink_router:\n"
image =             "    image: grantphllps/mavlink_router\n"
containerName =     "    container_name: mavlink_router\n"
depends =           "    depends_on:\n"
f.writelines([container,image,containerName,depends])
#Mavlink router depends
for i in range(1,numberOfVehicles+1):
    var = str(i)    
    depend =           "      - sitl_" + var + "\n"
    f.write(depend)
options1 =          "    stdin_open: true\n"
options2 =          "    tty: true\n"
network =           '    network_mode: "host"\n'
volume =            '    volumes:\n'
volume1 =           '      - ./simulator_generated_files/mavlink_router:/root/home/mavlink_router_files\n'
command =           '    command: >\n'
command1 =          '      /bin/bash -c "mavlink-routerd -c /root/home/mavlink_router_files/main.conf"'
f.writelines([options1,options2,network,volume,volume1,command,command1])

#End Mavlink Router
###################

f.close()

#####################
#End docker-compose
#####################