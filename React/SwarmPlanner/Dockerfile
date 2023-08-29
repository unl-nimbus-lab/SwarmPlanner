# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app



# Copy the entrypoint script to the container
COPY entrypoint.sh /usr/local/bin/entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /usr/local/bin/entrypoint.sh

# Start the development server using the entrypoint script
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
