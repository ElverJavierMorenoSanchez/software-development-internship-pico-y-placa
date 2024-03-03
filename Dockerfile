FROM node:18-alpine AS base

WORKDIR /app

COPY package.json ./
RUN npm ci

COPY . .

CMD ["npm","start"]
