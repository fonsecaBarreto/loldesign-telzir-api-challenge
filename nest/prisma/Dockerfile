FROM node:18-alpine

WORKDIR /app

RUN npm install @prisma/client prisma -g --unsafe-perm

RUN npm install ts-node@10.9.1 -g --unsafe-perm

COPY . ./prisma/

RUN npx prisma generate