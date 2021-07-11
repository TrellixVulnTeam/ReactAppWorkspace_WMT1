FROM node:alpine

RUN mkdir /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

CMD ["npm", "start"]