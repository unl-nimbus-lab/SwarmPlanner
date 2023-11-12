#!/bin/bash
set -e

# Overlay the ROS environment
source '/usr/share/gazebo/setup.sh'
source '/opt/ros/melodic/setup.bash'
exec "$@"