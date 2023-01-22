# syntax=docker/dockerfile:1
FROM ubuntu:22.04

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
WORKDIR ${HOME}

# Install some helpful utilities
RUN apt-get update && apt-get install -y --no-install-recommends \
    iputils-ping \
    net-tools \
    clang \
    g++ \
    rsync \
    zip \
    make \
    cmake \
    curl \
    wget \
    libopencv-dev \
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

# Install Python packages
RUN pip3 install \
    numpy \
    pandas \
    scipy \
    matplotlib

COPY pymavswarm ./pymavswarm
RUN cd pymavswarm && pip3 install .
COPY SwarmPlanner.py .
COPY helperFunctions.py .

EXPOSE 8080

CMD ["python3", "/home/SwarmPlanner.py"]