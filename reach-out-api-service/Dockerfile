FROM node:14

# Create app directory
WORKDIR /usr/src/reach-out-api-service

# Install app dependencies
COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 1330

CMD [ "node", "index.js" ]