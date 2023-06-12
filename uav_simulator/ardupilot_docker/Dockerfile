FROM ubuntu:18.04

# Setup timezone
RUN echo 'Etc/UTC' > /etc/timezone \
    && ln -s /usr/share/zoneinfo/Etc/UTC /etc/localtime \
    && apt-get update \
    && apt-get install -q -y --no-install-recommends tzdata \
    && rm -rf /var/lib/apt/lists/*

# Setup the environments
ENV LANG=C.UTF-8
ENV LC_ALL=C.UTF-8
ENV HOME=/home/

# install git 
RUN apt-get update && apt-get install -y git; git config --global url."https://github.com/".insteadOf git://github.com/

# Now grab ArduPilot from GitHub
RUN git clone https://github.com/ArduPilot/ardupilot.git /home/ardupilot
WORKDIR /home/ardupilot

# Now start build instructions from http://ardupilot.org/dev/docs/setting-up-sitl-on-linux.html
RUN git submodule update --init --recursive

RUN apt install -y \
    python-matplotlib \
    python-serial \
    python-wxgtk3.0 \
    python-wxtools \
    python-lxml \
    python-scipy \
    python-opencv \
    ccache \
    gawk \
    python-pip \
    python-pexpect

RUN pip install \
    future \
    pymavlink \
    MAVProxy \
    empy

RUN echo "export PATH=$PATH:$HOME/ardupilot/Tools/autotest" >> /home/.bashrc
RUN echo "export PATH=/usr/lib/ccache:$PATH" >> /home/.bashrc
RUN . /home/.bashrc


#Now for some ArduCopter file tuning :)
#First is the modified vehicle info file
RUN rm /home/ardupilot/Tools/autotest/pysim/vehicleinfo.py
RUN rm /home/ardupilot/Tools/autotest/sim_vehicle.py

COPY ./modified_files/vehicleinfo.py /home/ardupilot/Tools/autotest/pysim/
COPY ./modified_files/gazebo-drone* /home/ardupilot/Tools/autotest/default_params/
COPY ./modified_files/sim_vehicle.py /home/ardupilot/Tools/autotest/

RUN ./waf configure --board sitl
RUN ./waf copter

# TCP 5760 is what the sim exposes by default
EXPOSE 5760
EXPOSE 5763
EXPOSE 14550/udp

WORKDIR /home

RUN chmod +x /home/ardupilot/Tools/autotest/sim_vehicle.py

# Finally the command
#ENTRYPOINT /ardupilot/Tools/autotest/sim_vehicle.py --vehicle ${VEHICLE} -I${INSTANCE} --custom-location=${LAT},${LON},${ALT},${DIR} -w --frame ${MODEL} --no-rebuild --no-mavproxy --speedup ${SPEEDUP}asdf