FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm i ts-node

COPY . .

ENV PORT=80

EXPOSE 80

CMD ["npm","start"]

