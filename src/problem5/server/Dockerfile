FROM node:23

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

expose 8080

cmd ["yarn", "start"]
