#!/bin/bash
set -e

# Overlay the ROS environment
source "/opt/ros/$ROS_DISTRO/setup.bash"
source "/home/catkin_ws/devel/setup.bash"
exec "$@"