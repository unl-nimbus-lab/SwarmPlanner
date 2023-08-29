# swarmplanner
A browser-based tool for managing swarms

# To use the application as is:

`git clone <this repository>`

## If you want to use Swarmplanner with USB devices:

`cd SwarmPlanner/deployment`

## then start the app:

`docker-compose up`

## If you want to use SwarmPlanner in simulation:

`cd SwarmPlanner/simulation`

## then start the app:

`docker-compose up`

# To use the application in `Development mode`: 

`cd SwarmPlanner/React/SwarmPlanner`

## Build the development image:

`docker build -t swarmplanner_devel .`

## then start the development image:

`docker run -p 3000:3000 --mount type=bind,source="$(pwd)",target=/app swarmplanner_devel`