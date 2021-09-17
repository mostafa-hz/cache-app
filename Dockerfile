FROM node:lts-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app dist
COPY dist dist

EXPOSE 9090

CMD [ "node", "." ]
