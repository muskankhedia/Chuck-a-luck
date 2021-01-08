FROM node:latest

RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN npm install -g http-server
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
