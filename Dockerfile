FROM node:15.14.0-buster-slim

COPY . /opt

WORKDIR /opt

RUN npm i

CMD [ "npm", "start" ]

