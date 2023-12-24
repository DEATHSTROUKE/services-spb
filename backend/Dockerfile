FROM node:18.18

WORKDIR /app

COPY package*.json ./
COPY yarn*.json ./

COPY . .

RUN yarn

CMD [ "yarn", "prod" ]