FROM mhart/alpine-node:12
WORKDIR /usr/server
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
EXPOSE 8000
EXPOSE 8001
EXPOSE 8002
CMD ["npm", "start"]
