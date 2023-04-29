FROM node:16 AS builder

WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
COPY . /app/
RUN npm install && npx prisma generate
RUN npm run build
