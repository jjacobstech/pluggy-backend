FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

COPY .env .env

COPY . .

RUN npm install

RUN npx prisma migrate dev --name init

EXPOSE 8000

CMD npm run start:dev