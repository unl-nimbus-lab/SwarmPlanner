FROM ubuntu:18.04

# Setup timezone
RUN echo 'Etc/UTC' > /etc/timezone \
    && ln -s /usr/share/zoneinfo/Etc/UTC /etc/localtime \
    && apt-get update \
    && apt-get install -q -y --no-install-recommends tzdata \
    && rm -rf /var/lib/apt/lists/*

# Create the image file structure
RUN mkdir /home/catkin_ws \
    && mkdir /home/catkin_ws/src

# Setup the environments
ENV LANG=en_US.UTF-8
ENV LC_ALL=C.UTF-8
ENV ROS_DISTRO=melodic
ENV HOME=/home/
ENV ROS_WS=/home/catkin_ws/
WORKDIR ${HOME}

# Install some helpful utilities
RUN apt-get update && apt-get install -y --no-install-recommends \
    iputils-ping \
    net-tools \
    nano \
    vim \
    git \
    clang \
    g++ \
    rsync \
    zip \
    make \
    pciutils \
    ubuntu-drivers-common \
    cmake \
    curl \
    wget \
    libopencv-dev \
    python3-opencv \
    build-essential \
    lsb-release \
    ca-certificates \
    dirmngr \
    gnupg2 \
    python3 \
    python3-pip \
    netbase \
    htop \
    nmap \
    && rm -rf /var/lib/apt/lists/*


# Add the ROS repo to the sources list
RUN sh -c 'echo "deb http://packages.ros.org/ros/ubuntu $(lsb_release -sc) main" > /etc/apt/sources.list.d/ros-latest.list'

# Add the ROS key
RUN curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc | apt-key add -

#Install ROS Melodic
RUN apt update && apt install -y --no-install-recommends \
    ros-melodic-desktop-full \
    python-rosdep \
    python-rosinstall \
    python-rosinstall-generator \
    python-wstool \
    build-essential \
    python-catkin-tools

RUN rosdep init && rosdep update

#Download and build Gazebo
RUN sh -c 'echo "deb http://packages.osrfoundation.org/gazebo/ubuntu-stable `lsb_release -cs` main" > /etc/apt/sources.list.d/gazebo-stable.list'

RUN wget http://packages.osrfoundation.org/gazebo.key -O - |  apt-key add -

RUN apt update
RUN apt install gazebo9 libgazebo9-dev -y

RUN git clone https://github.com/khancyr/ardupilot_gazebo.git

WORKDIR ardupilot_gazebo
RUN git checkout dev
RUN mkdir build
WORKDIR build
RUN cmake ..
RUN make -j4
RUN make install

#Some helpful environment variables
ENV DISPLAY=:0
ENV GAZEBO_MODEL_PATH=/home/ardupilot_gazebo/models

#This command fixes A LOT of issues (?)
RUN apt upgrade libignition-math2 -y

WORKDIR /home/catkin_ws/

#Add more models
RUN git clone https://github.com/osrf/gazebo_models.git

# COPY ./packages/iq_sim /home/catkin_ws/src/iq_sim

RUN . /opt/ros/${ROS_DISTRO}/setup.sh \
    && catkin build -j4

#ENV GAZEBO_MODEL_PATH=${GAZEBO_MODEL_PATH}:$HOME/catkin_ws/src/uav_sim/models
ENV GAZEBO_MODEL_PATH=${GAZEBO_MODEL_PATH}:/home/catkin_ws/src/iq_sim/models

COPY ./gazebo_entrypoint.sh /
RUN ["chmod", "+x", "/gazebo_entrypoint.sh"]

ENTRYPOINT ["/gazebo_entrypoint.sh"]

CMD bash

#xhost +local:docker

#docker run -it --gpus all --net=host --rm --name gazebo-ros-container --env="DISPLAY" --env="QT_X11_NO_MITSHM=1" --volume="/tmp/.X11-unix:/tmp/.X11-unix:rw" gazebo_docker

#gzserver --verbose ~/ardupilot_gazebo/worlds/iris_arducopter_runway.world