FROM node:latest

WORKDIR /src

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3

CMD [ "npm", "run", "dev" ]