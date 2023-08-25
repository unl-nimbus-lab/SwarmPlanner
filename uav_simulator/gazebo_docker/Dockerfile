# Dockerfile for running ROS with a VNC setup.
#
# Lots of this taken from various Docker files from places, Heavily based on Carrick Detweiler's class script
#
# Grant Phillips 2023

#Official images: https://hub.docker.com/_/ros/
FROM ros:melodic

ENV DEBIAN_FRONTEND=noninteractive

# Setup the environments
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8
ENV ROS_DISTRO=melodic
ENV HOME=/home/
ENV ROS_WS=/home/shared/catkin_ws/
WORKDIR ${HOME}

# Install the full desktop workspace
RUN apt-get update && apt-get install -y --no-install-recommends \
    ros-melodic-desktop-full \
  && rm -rf /var/lib/apt/lists/*


# Install some helpful utilities
RUN apt-get update && apt-get install -y --no-install-recommends \
    nano \
    vim \
    git \
    g++ \
    rsync \
    zip \
    make \
    cmake \
    curl \
    wget \
    libopencv-dev \
    python3-opencv \
    build-essential \
    lsb-release \
    gnupg2 \
    python3 \
    python3-pip \
    netbase \
    htop \
    nmap \
    less \
    emacs \
    screen \
    socat \
    && rm -rf /var/lib/apt/lists/*


#Python serial libraries
RUN pip3 install setuptools
RUN pip3 install serial serial-tool

#Install python2 pip for ROS
RUN apt-get update && apt-get install -y --no-install-recommends \
    python-pip \
  && rm -rf /var/lib/apt/lists/*

#The 2.0 libs for ROS
RUN pip install setuptools
RUN pip install serial pyserial

#############################
#
# Setup VNC
#
# Some of the useful sites where this config was shamelessly copied from:
#  https://qxf2.com/blog/view-docker-container-display-using-vnc-viewer/
#  https://stackoverflow.com/questions/16296753/can-you-run-gui-applications-in-a-linux-docker-container
#  https://github.com/dbushell/docker-xfce-vnc/blob/main/Dockerfile
#  https://github.com/x11vnc/x11vnc-desktop.git
#############################

RUN apt-get update && apt-get install -y --no-install-recommends \
    x11vnc \
    xfce4 \
    dbus-x11 \
    tigervnc-common \
    tigervnc-standalone-server \
    tigervnc-xorg-extension \
    tigervnc-viewer \
    && rm -rf /var/lib/apt/lists/*
    

#RUN wget -qO- https://dl.bintray.com/tigervnc/stable/tigervnc-1.10.1.x86_64.tar.gz \
#  | tar xz --strip 1 -C /
  
#Set resolution and VNC password
ENV DISPLAY=:1 \
  VNC_DEPTH=24 \
  VNC_RESOLUTION=1280x720 \
  VNC_PASSWORD=password


RUN     mkdir ~/.vnc
# Setup a password
RUN     x11vnc -storepasswd 1234 ~/.vnc/passwd

EXPOSE 5901

#Other userful GUI stuff
RUN apt-get update && apt-get install -y --no-install-recommends \
    gnome-terminal \
    && rm -rf /var/lib/apt/lists/*


#############################################
# END VNC STUFF
#############################################


#Make screen and bash a bit nicer
COPY ./.screenrc /home/
COPY ./.bashrc /home/
COPY ./.namescreen_src /home/

#xfce configuration to a temporary location as it gets overwritten when starting tightvnc-start.sh (?)
COPY ./.config /home/config2

#Install Gazebo and ArduPilot Plugin, these steps are copied directly from: https://github.com/Intelligent-Quads/iq_tutorials/blob/master/docs/installing_gazebo_arduplugin.md
RUN sh -c 'echo "deb http://packages.osrfoundation.org/gazebo/ubuntu-stable `lsb_release -cs` main" > /etc/apt/sources.list.d/gazebo-stable.list'
RUN wget http://packages.osrfoundation.org/gazebo.key -O - | sudo apt-key add -
RUN apt-get update && apt-get install -y --no-install-recommends \
    gazebo9 \
    libgazebo9-dev

RUN git clone https://github.com/khancyr/ardupilot_gazebo.git
WORKDIR /home/ardupilot_gazebo
RUN git checkout dev
RUN mkdir build
WORKDIR /home/ardupilot_gazebo/build
RUN cmake ..
RUN make -j4
RUN make install
RUN echo 'source /usr/share/gazebo/setup.sh' >> ~/.bashrc
RUN echo 'export GAZEBO_MODEL_PATH=~/ardupilot_gazebo/models' >> ~/.bashrc
#This command fixes A LOT of issues (?)
RUN apt upgrade libignition-math2 -y

#Install some pre-built simulation models, the steps are copied directly (sans mavros install) from: https://github.com/Intelligent-Quads/iq_tutorials/blob/master/docs/installing_ros.md
RUN apt-get update && apt-get install -y --no-install-recommends \
    python-wstool \
    python-rosinstall-generator \
    python-catkin-tools
WORKDIR /home
RUN mkdir -p /home/catkin_ws/src
WORKDIR /home/catkin_ws
RUN catkin init
WORKDIR /home/catkin_ws/src
RUN git clone https://github.com/Intelligent-Quads/iq_sim.git
RUN echo "GAZEBO_MODEL_PATH=${GAZEBO_MODEL_PATH}:$HOME/catkin_ws/src/iq_sim/models" >> ~/.bashrc
WORKDIR /home
# you will have to build this on your own :)

# Start the VNC server and run things
COPY ./tigervnc-start.sh /
RUN ["chmod", "+x", "/tigervnc-start.sh"]
ENTRYPOINT ["/tigervnc-start.sh"]
CMD ["bash"]


#############################
# BUILDING AND RUNNING:
# docker build -t ros .
# docker run --rm -v $PWD/shared:/home/shared -p 5901:5901 -it ros
#
# VNC: connect to localhost:5901 with password password
#  On OS X: "screen sharing"
#  On Windows:
#  On Linux: 
