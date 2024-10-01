# uav_simulator
This project facilitates simulating arduCopter enabled UAVs for swarms using SITL and Gazebo. This simulator extends the steps provided by the Intelligent Quads (https://github.com/Intelligent-Quads) developers by providing a containerized solution to their work. 

# Getting started
It is recommended that this simulator be run on Ubuntu 18.04+

# Install Docker Engine
Docker Engine needs to be installed on the host machine, here is a link to the instructions for installing Docker Engine on Ubuntu:

`https://docs.docker.com/engine/install/ubuntu/`

# Clone the repository and navigate to the swarm_simulator directory

`cd uav_simulator/swarm_simulator`

# Generate the docker-compose file
docker-compose is a powerful tool that is utilized here to launch the simulation all at once, however, there is very little control over
the "flow" of a docker-compose file. As such, a python script `generate_compose.py` is used to generate the docker-compose file based
on the type of simulation that is desired. At this point the user may specify the number of UAV's to simulate, if gazebo should be used,
and if any companion process should be used. Below is an example to generate a compose file for a single arduCopter simulation. 

`python3 generate_compose.py 1`

## Number of Vehicles
The first option specifies the number of UAVs to simulate (1-12). For instance, to generate a compose file for 5 SITL instances would be:

`python3 generate_compose.py 5`

then to start the simulation:

`sudo docker-compose up`

## Include a Companion process -c
To include a ROS-based companion process use the -c flag as follows:

`python3 generate_compose.py 4 -c`

then to start the simulation:

`sudo docker-compose up`

There is a default companion process specified in generate_compose.py that starts the NIMBUS clustering control. A companion process can
be used without the `-c` flag. By default, the SITL ports exposed for companion processes are 14XX1 starting at 14561 for agent 1, 14571
for agent 2 and so on.

### MAVROS
In order to connect a MAVROS node to a STIL instance use:

agent_1: `fcu_url:=udp://127.0.0.1:14561@14565`

agent_2: `fcu_url:=udp://127.0.0.1:14571@14575`

and increment the port by 10 for each subsequent agent
 
## Gazebo
Gazebo provides a more realistic simulation environment as well as the ability to include additional sensors, obstacles, and provides
a nice visual component to your simulation. 

### Installing Gazebo Natively (recommended) 
Gazebo and ROS can be installed on the host machine (recommended) by following the steps 
outlined in https://github.com/Intelligent-Quads/iq_tutorials/blob/master/docs/installing_gazebo_arduplugin.md and 
https://github.com/Intelligent-Quads/iq_tutorials/blob/master/docs/installing_gazebo_arduplugin.md (you can skip step 3 in the 
second README). 

### Containerized Gazebo (not recommended)
Alternativly a seperate docker compose file can be used to start a container with Gazebo already installed, this can be launched 
by navigating to the `gazebo_docker` directory and running the command: 

`sudo docker-compose up` 

The container can be acessed by launching a VNC client (Remmina works fine for Ubuntu) and opening up `localhost:5901` and
the password is `password`. Again, it is recommneded that Gazebo be run natively as the containerized version performs
significantly worse. 

### Proceeding with Gazebo

In order to generate the gazebo portion of the compose file, specify the `-g` flag:

`python3 generate_compose.py 5 -g`

**DO NOT** run the compose file yet. Go to the `/home/catkin_ws` folder either on the host machine or in the VNCd container and
run `catkin build`. Once the catkin build finishes, run `. devel/setup.bash`. **NOTE** if you are not using the container but
you are using Ubuntu on a virtual machine, run `export SVGA_VGPU10=0` to prevent erros in the future. Finally launch Gazebo with:

`roslaunch iq_sim multi_drone.launch`

After a Gazebo window appears displaying the drones, proceed as normal:

`cd ~/uav_simulator/swarm_simulator`

and

`sudo docker-compose up`

# Update 9/30

### The command to start SITL (In the base image, there are no other frames ardupilot knows about)

/bin/bash -c "/home/ardupilot/Tools/autotest/sim_vehicle.py -v ArduCopter -f gazebo-iris -m '--daemon --streamrate=-1'"

### The command to start gazebo with the correct world

gazebo --verbose ~/ardupilot_gazebo/worlds/iris_arducopter_runway.world

gazebo Not working with router, can connect via swarmplanner using port 14550, not going to worry about this for now 

TODO for gazebo:

1) Need edit ardupilot/Tools/autotest/pysim/vehicleinfo.py dynamically in generate compose to have "gazebo-drones" (done)

2) Need to change the part in generate compose that makes the sitl things becase they are wrong for gazebo (best to leave the non-gazebo parts as they are :) ) (done works for both gazebo and sitl only)

3) and then the swarm worlds 

4) Figure out wtf is going on with mavlink router (done, don't touch the mavlink router config)