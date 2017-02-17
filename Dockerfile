FROM node:boron
FROM ubuntu

RUN apt-get update
RUN apt-get -qq update
RUN apt-get install -y nodejs-legacy
RUN apt-get install -y nodejs npm

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
ADD package.json /usr/src/app/package.json
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 3001
CMD [ "npm", "start" ]