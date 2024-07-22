# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install



# Copy the rest of the app source code to the working directory
COPY . .


# Build the application
RUN npm run build
# Expose a port (replace 3000 with the port your app listens on)
EXPOSE 3000

# Define the command to run your app
CMD [ "npm", "start" ]