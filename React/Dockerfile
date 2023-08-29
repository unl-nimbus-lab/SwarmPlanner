# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY ./SwarmPlanner ./

# Install app dependencies
RUN npm install

# Start the development server
CMD ["npm", "start"]
