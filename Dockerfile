FROM node:alpine

RUN mkdir /src
WORKDIR /src
COPY . .

RUN npm i
RUN npm run build

CMD npm start