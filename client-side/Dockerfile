FROM node:14

# Set working directory
WORKDIR /app

# Install app dependencies
COPY client-side/package*.json ./
RUN npm install

# Bundle app source
COPY client-side/ /app/