FROM node:23-alpine

WORKDIR /location-collector-api-node

COPY package*.json ./
RUN npm install
COPY . .

ARG PORT
ENV PORT=$PORT
EXPOSE $PORT

CMD [ "npm", "start" ]