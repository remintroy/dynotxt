FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5003

EXPOSE 5003

CMD ["npm","start"]

