FROM node:18-alpine

WORKDIR /app

RUN npm install @prisma/client prisma -g --unsafe-perm

RUN npx prisma generate