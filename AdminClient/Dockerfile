FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5002

EXPOSE 5002

CMD ["npm","run","dev"]