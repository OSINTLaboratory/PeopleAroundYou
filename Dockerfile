FROM mhart/alpine-node:12
WORKDIR /usr/server
COPY . .
RUN npm i
EXPOSE 8000
EXPOSE 8001
EXPOSE 8002
CMD ["npm", "start"]
