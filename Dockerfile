FROM node:16.19-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 9000

CMD [ "node","index.js" ]