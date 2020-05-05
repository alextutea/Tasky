FROM node:10

# Create app directory
WORKDIR tasky-console-client

# Install app dependencies
COPY package*.json ./

RUN npm install

EXPOSE 8080

# Bundle app source
COPY . .
#CMD ["node", "index.js"]