FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

RUN npm run build

ENV PORT=5001

EXPOSE 5001

CMD ["node","build/index.js"]

