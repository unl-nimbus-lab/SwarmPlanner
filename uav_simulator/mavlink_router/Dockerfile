FROM ubuntu:20.04

ARG DEBIAN_FRONTEND=noninteractive

#Install dependencies
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    build-essential \
    checkinstall \
    zlib1g-dev \
    libssl-dev \
    iputils-ping \
    pkg-config \
    wget \
    git \
	ninja-build \
	gcc \
	g++ \
    nano \
    systemd \
    python3 \
    python3-pip \
	&& apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

#Install python libraries
RUN pip3 install meson

#Build cmake from source since meson is too good for cmake 3.16
RUN cd /home/ \
    && wget https://github.com/Kitware/CMake/releases/download/v3.22.2/cmake-3.22.2.tar.gz \
    && tar -zxvf cmake-3.22.2.tar.gz

RUN cd /home/cmake-3.22.2 \
    && ./bootstrap \
    && make \
    && make install

#Install mavlink router
RUN cd /home && git clone https://github.com/mavlink-router/mavlink-router.git

RUN cd /home/mavlink-router \
    && git submodule update --init --recursive \
    && meson setup build . \
    && ninja -C build \
    && ninja -C build install

RUN mkdir -p /etc/mavlink-router && touch /etc/mavlink-router/main.conf

COPY ./main.conf /etc/mavlink-router/

EXPOSE 6969/udp

WORKDIR /home/mavlink-router

# ENTRYPOINT ["/mavlink-router/build/src/mavlink-routerd", "-e", "127.0.0.1:14650", "-e", "127.0.0.1:14651", "-t", "0", "0.0.0.0:14550"]
