FROM node:10

# Create app directory
WORKDIR tasky-back

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 3000

# CMD ["jest"]
#CMD ["npm", "run", "test"]
#CMD ["npm", "run", "dev"]