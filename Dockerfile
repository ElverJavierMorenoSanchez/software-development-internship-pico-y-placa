FROM node:alpine AS base

WORKDIR /app

COPY package.json ./
RUN npm i

COPY . .

CMD ["npm","start"]
