FROM node:18-alpine

RUN echo $DATABASE_URL

WORKDIR /app

RUN npm install @prisma/client prisma -g --unsafe-perm

RUN npx prisma generate