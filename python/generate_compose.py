
import sys

#Some global variables:
startingMavrosPort = 14551
startingMavrosBind = 14555
startingCommsPort = 5762
portIncrement = 10
gazeboFlagHost = False
gazeboFlagCont = False
companionProcess = False
defaultCompanionImage = "grantphllps/mavros_docker"
hostCatkinLocation = "home/gphillip/catkin_ws/src/iq_sim/worlds"
pathToUAVSimulator = "./uav_simulator"
pathToSwarmSimulator = "./uav_simulator/swarm_simulator"

#check that the first input is an integer
try:
    try:
        n = int(sys.argv[1])
        if (n < 1 or n > 12):
            sys.exit("Error: number of drones must be between 1 and 12")
        print("Building compose for " + str(n) + " drones ...")
    except ValueError:
        sys.exit("Error: Please input an integer number of drones to simulate")

except IndexError:
    sys.exit("Error: Please input an integer number of dronese to simulate as first argument")


#Process the rest of the arguments
numberOfArgs = len(sys.argv)

if numberOfArgs > 2:
    for i in range(2,numberOfArgs):
        if (sys.argv[i][0] != "-"): #Dont parse non "-" cli arguments
            continue
        else:
            match(sys.argv[i]):
                case "-gh":
                    print("building for Gazebo Host")
                    print("Dont forget to run: export SVGA_VGPU10=0")
                    gazeboFlagHost = True
                    hostCatkinLocation = sys.argv[i+1]
                case "-gc":
                    print("building for Gazebo Container")
                    gazeboFlagCont = True
                case "-c":
                    print("Adding companion processes")
                    companionProcess = True
                case "-d":
                    try:
                        print("user specified companion processes: " + sys.argv[i+1])
                        defaultCompanionImage = sys.argv[i + 1]
                    except IndexError:
                        sys.exit("Error: please specify a docker image")

#Generate the env_files if asked
#These files configure sitl
for i in range(1,n + 1):
    filename = pathToSwarmSimulator + "/env_files/env" + str(i)
    f = open(filename,"w")
    instance =  "INSTANCE=0\n"
    lat =       "LAT=40.846\n"
    lon =       "LON=-96.471" + str(i) + "\n"
    alt =       "ALT=390\n"
    dir =       "DIR=0\n"
    model =     "MODEL=+\n"
    vehicle =   "VEHICLE=ArduCopter\n"
    f.writelines([instance,lat,lon,alt,dir,model,vehicle])
    f.close()

print("Ardupilot env files generated sucessuflly!")

#Generate the ros_envs
#These files configure the clustering control
for i in range(1,n + 1):
    filename = pathToSwarmSimulator + "/env_files/ros_env" + str(i)
    f = open(filename,"w")
    port =              "PORT=udp://127.0.0.1:" + str(startingMavrosPort + (i)*portIncrement) + "@" + str(startingMavrosBind + (i)*10) + "\n"             #Same across all vehicles
    sysId =             "SYS_ID=" + str(i) + "\n"               #Different for each vehicle
    compId =            "COMP_ID=1\n"                           #Same across all vehicles
    clusterId =         "CLUSTER_ID=1\n"                        #Same across all vehicles
    clusterPos =        "CLUSTER_POSITION=" + str(i) + "\n"     #Different for each vehicle
    clusterSize =       "CLUSTER_SIZE=" + str(n) + "\n"                        
    clusterRad =        "CLUSTER_RADIUS=16\n"
    agentAlt =          "AGENT_ALT=" + str(i * 3.0) + "\n"
    homeLat =           "HOME_LAT=40.8467784\n"
    homeLon =           "HOME_LON=-96.4719180\n"
    homeAlt =           "HOME_ALT=400\n"
    rally1Lat =         "RALLY1LAT=0\n"
    rally1Lon =         "RALLY1LON=30\n"
    rally2Lat =         "RALLY2LAT=30\n"
    rally2Lon =         "RALLY2LON=0\n"
    swarmComp =         'SWARM_COMP="/home/catkin_ws/src/clustering_control/src/HRL_Sys_4_4_4.json"'
    f.writelines([port,sysId,compId,clusterId,clusterPos,clusterSize,clusterRad,agentAlt,homeLat,homeLon,homeAlt,rally1Lat,rally1Lon,rally2Lat,rally2Lon,swarmComp])
    f.close()

print("Companion process files generated successfully!")

#Generate the mavlink router file
mavlinkConfig = pathToSwarmSimulator + "/mavlink_router/main.conf"
f = open(mavlinkConfig,"w")

name = "[TcpServer Default]\n"
address = "Address = 0.0.0.0\n"
port = "Port = 5759\n\n"

f.writelines([name,address,port])

for i in range(1,n + 1):
    name =      "[TcpEndpoint sitl_" + str(i) + "]\n"
    address =   "Address = 0.0.0.0\n"
    port =      "Port = " + str(startingCommsPort + i*portIncrement) + "\n\n"
    f.writelines([name,address,port])

#Add the main UPD connection
name =      "[UdpEndpoint omega]\n"
mode =      "Mode=Normal\n"
address =   "Address = 0.0.0.0\n"
port =      "Port = 4242\n"
f.writelines([name,mode,address,port])

#Add the secondary UPD connection
name =      "[UdpEndpoint collision]\n"
mode =      "Mode=Normal\n"
address =   "Address = 0.0.0.0\n"
port =      "Port = 4243\n"
f.writelines([name,mode,address,port])

f.close()

print("Mavlink router configuration generated successfully!")

#Create a docker-compose file Header
f = open( pathToSwarmSimulator + "/docker-compose.yaml","w")
f.writelines(["version: '3'\n\n","services:\n"])

#SITL Images:
for i in range(1,n+1):
    var = str(i)
    #nvar = str(i-1)

    container =         "  sitl_" + var + ":\n"
    image =             "    image: grantphllps/ardupilot\n"
    containerName =     "    container_name: sitl_" + var + "\n"
    network =           "    network_mode: host\n"
    volumes =           '    volumes:\n'
    envVol =            '      - ./env_files:/root/home/env_files\n'
    command =           '    command: >\n'
    comman1 =           '      /bin/bash -c "export $$(cat /root/home/env_files/env' + var + ') &&\n'
    if (gazeboFlagHost or gazeboFlagCont):
        comman2 =       '                    /home/ardupilot/Tools/autotest/sim_vehicle.py --vehicle $${VEHICLE} -w --custom-location=$${LAT},$${LON},$${ALT},$${DIR} --no-rebuild -f gazebo-drone' + var +' -I' + var + ' --add-param-file=/home/ardupilot/Tools/autotest/default_params/gazebo-drone' + var + '.parm"\n'
    else:
        comman2 =       '                    /home/ardupilot/Tools/autotest/sim_vehicle.py --vehicle $${VEHICLE} -w --custom-location=$${LAT},$${LON},$${ALT},$${DIR} --no-rebuild -I' + var + ' --add-param-file=/home/ardupilot/Tools/autotest/default_params/gazebo-drone' + var + '.parm"\n'
    
    f.writelines([container,image,containerName,network,volumes,envVol,command,comman1,comman2,"\n"])

    if (companionProcess == True):
        container =         "  clustering_" + var + ":\n"
        depends =           "    depends_on:\n"
        depend1 =           "      - sitl_" + var + "\n"
        depend2 =           "      - mavlink_router\n"
        network =           "    network_mode: host\n"
        image =             "    image: " + defaultCompanionImage + "\n"
        containerName =     "    container_name: clustering_" + var + "\n"
        options1 =          "    stdin_open: true\n"
        options2 =          "    tty: true\n"
        volumes =           '    volumes:\n'
        envVol =            '      - ./env_files:/root/home/env_files\n'
        command =           '    command: >\n'
        comman1 =           '      /bin/bash -c "source /home/catkin_ws/devel/setup.bash &&\n'
        comman2 =           '                    export $$(cat /root/home/env_files/ros_env' + var +')\n'
        if (i > 1):
            comman3 =           '                    roslaunch --wait mavros apm.launch fcu_url:=$${PORT} tgt_system:=$${SYS_ID} tgt_component:=$${COMP_ID}"\n'
        else: 
            comman3 =           '                    roslaunch mavros apm.launch fcu_url:=$${PORT} tgt_system:=$${SYS_ID} tgt_component:=$${COMP_ID}"\n'

        f.writelines([container,depends,depend1,depend2,network,image,containerName,options1,options2,volumes,envVol,command,comman1,comman2,comman3,"\n"])

#Mavlink router for Mavlink Comms
container =         "  mavlink_router:\n"
image =             "    image: grantphllps/mavlink_router\n"
containerName =     "    container_name: mavlink_router\n"
depends =           "    depends_on:\n"
f.writelines([container,image,containerName,depends])
#Mavlink router depends
for i in range(1,n+1):
    var = str(i)    
    depend =           "      - sitl_" + var + "\n"
    f.write(depend)
options1 =          "    stdin_open: true\n"
options2 =          "    tty: true\n"
network =           '    network_mode: "host"\n'
volume =            '    volumes:\n'
volume1 =           '      - ./mavlink_router:/root/home/mavlink_router_files\n'
command =           '    command: >\n'
command1 =          '      /bin/bash -c "mavlink-routerd -c /root/home/mavlink_router_files/main.conf"'


f.writelines([options1,options2,network,volume,volume1,command,command1])
f.close()

if (gazeboFlagCont):
    ##Generate Gazebo world
    #generate the 'base' world first
    f = open("../shared/iq_sim/worlds/multi_drone.world","w")
    f.writelines([
    '<?xml version="1.0"?>\n',
    '<sdf version="1.5">\n',
    '  <world name="default">\n',
    '    <physics type="ode">\n',
    '      <ode>\n',
    '        <solver>\n',
    '          <type>quick</type>\n',
    '          <iters>100</iters>\n',
    '          <sor>1.0</sor>\n',
    '        </solver>\n',
    '        <constraints>\n',
    '          <cfm>0.0</cfm>\n',
    '          <erp>0.9</erp>\n',
    '          <contact_max_correcting_vel>0.1</contact_max_correcting_vel>\n',
    '          <contact_surface_layer>0.0</contact_surface_layer>\n',
    '        </constraints>\n',
    '      </ode>\n',
    '      <real_time_update_rate>-1</real_time_update_rate>\n',
    '    </physics>\n\n',

    '    <model name="ground_plane">\n',
    '      <static>true</static>\n',
    '      <link name="link">\n',
    '        <collision name="collision">\n',
    "          <geometry>\n",
    "            <plane>\n",
    "              <normal>0 0 1</normal>\n",
    "              <size>5000 5000</size>\n",
    "            </plane>\n",
    "          </geometry>\n",
    "          <surface>\n",
    "            <friction>\n",
    "              <ode>\n",
    "                <mu>1</mu>\n",
    "                <mu2>1</mu2>\n",
    "              </ode>\n",
    "            </friction>\n",
    "          </surface>\n",
    "        </collision>\n",
    '        <visual name="runway">\n',
    "          <pose>000 0 0.005 0 0 0</pose>\n",
    "          <cast_shadows>false</cast_shadows>\n",
    "          <geometry>\n",
    "            <plane>\n",
    "              <normal>0 0 1</normal>\n",
    "              <size>1829 45</size>\n",
    "            </plane>\n",
    "          </geometry>\n",
    "          <material>\n",
    "            <script>\n",
    "              <uri>file://media/materials/scripts/gazebo.material</uri>\n",
    "              <name>Gazebo/Runway</name>\n",
    "            </script>\n",
    "          </material>\n",
    "        </visual>\n\n",

    '        <visual name="grass">\n',
    "          <pose>0 0 -0.1 0 0 0</pose>\n",
    "          <cast_shadows>false</cast_shadows>\n",
    "          <geometry>\n",
    "            <plane>\n",
    "              <normal>0 0 1</normal>\n",
    "              <size>5000 5000</size>\n",
    "            </plane>\n",
    "          </geometry>\n",
    "          <material>\n",
    "            <script>\n",
    "              <uri>file://media/materials/scripts/gazebo.material</uri>\n",
    "              <name>Gazebo/Grass</name>\n",
    "            </script>\n",
    "          </material>\n",
    "        </visual>\n\n",

    "      </link>\n",
    "    </model>\n\n",

    "    <include>\n",
    "      <uri>model://sun</uri>\n",
    "    </include>\n",
    ])

    #Now add the correct number of drones
    for i in range(1,n+1):
        var = str(i)
        line1 = '    <model name="drone' + var + '">\n'
        line2 = '      <pose> 0 ' + str(-1*i*(1.11)) +' 0 0 0 0</pose>\n'
        line3 = '      <include>\n'
        line4 = '        <uri>model://drone' + var + '</uri>\n'
        line5 = '      </include>\n'
        line6 = '    </model>\n'
        f.writelines([line1,line2,line3,line4,line5,line6])

    f.writelines(["\n","  </world>\n","</sdf>"])
    f.close()

elif (gazeboFlagHost):
    f = open(hostCatkinLocation,"w")
    #generate the 'base' world first
    f.writelines([
    '<?xml version="1.0"?>\n',
    '<sdf version="1.5">\n',
    '  <world name="default">\n',
    '    <physics type="ode">\n',
    '      <ode>\n',
    '        <solver>\n',
    '          <type>quick</type>\n',
    '          <iters>100</iters>\n',
    '          <sor>1.0</sor>\n',
    '        </solver>\n',
    '        <constraints>\n',
    '          <cfm>0.0</cfm>\n',
    '          <erp>0.9</erp>\n',
    '          <contact_max_correcting_vel>0.1</contact_max_correcting_vel>\n',
    '          <contact_surface_layer>0.0</contact_surface_layer>\n',
    '        </constraints>\n',
    '      </ode>\n',
    '      <real_time_update_rate>-1</real_time_update_rate>\n',
    '    </physics>\n\n',

    '    <model name="ground_plane">\n',
    '      <static>true</static>\n',
    '      <link name="link">\n',
    '        <collision name="collision">\n',
    "          <geometry>\n",
    "            <plane>\n",
    "              <normal>0 0 1</normal>\n",
    "              <size>5000 5000</size>\n",
    "            </plane>\n",
    "          </geometry>\n",
    "          <surface>\n",
    "            <friction>\n",
    "              <ode>\n",
    "                <mu>1</mu>\n",
    "                <mu2>1</mu2>\n",
    "              </ode>\n",
    "            </friction>\n",
    "          </surface>\n",
    "        </collision>\n",
    '        <visual name="runway">\n',
    "          <pose>000 0 0.005 0 0 0</pose>\n",
    "          <cast_shadows>false</cast_shadows>\n",
    "          <geometry>\n",
    "            <plane>\n",
    "              <normal>0 0 1</normal>\n",
    "              <size>1829 45</size>\n",
    "            </plane>\n",
    "          </geometry>\n",
    "          <material>\n",
    "            <script>\n",
    "              <uri>file://media/materials/scripts/gazebo.material</uri>\n",
    "              <name>Gazebo/Runway</name>\n",
    "            </script>\n",
    "          </material>\n",
    "        </visual>\n\n",

    '        <visual name="grass">\n',
    "          <pose>0 0 -0.1 0 0 0</pose>\n",
    "          <cast_shadows>false</cast_shadows>\n",
    "          <geometry>\n",
    "            <plane>\n",
    "              <normal>0 0 1</normal>\n",
    "              <size>5000 5000</size>\n",
    "            </plane>\n",
    "          </geometry>\n",
    "          <material>\n",
    "            <script>\n",
    "              <uri>file://media/materials/scripts/gazebo.material</uri>\n",
    "              <name>Gazebo/Grass</name>\n",
    "            </script>\n",
    "          </material>\n",
    "        </visual>\n\n",

    "      </link>\n",
    "    </model>\n\n",

    "    <include>\n",
    "      <uri>model://sun</uri>\n",
    "    </include>\n",
    ])

    #Now add the correct number of drones
    for i in range(1,n+1):
        var = str(i)
        line1 = '    <model name="drone' + var + '">\n'
        line2 = '      <pose> 0 ' + str(-1*i*(1.11)) +' 0 0 0 0</pose>\n'
        line3 = '      <include>\n'
        line4 = '        <uri>model://drone' + var + '</uri>\n'
        line5 = '      </include>\n'
        line6 = '    </model>\n'
        f.writelines([line1,line2,line3,line4,line5,line6])

    f.writelines(["\n","  </world>\n","</sdf>"])
    f.close()