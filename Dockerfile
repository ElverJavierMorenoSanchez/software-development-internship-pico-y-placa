FROM node:18-alphine AS base

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

CMD ["npm","start"]
