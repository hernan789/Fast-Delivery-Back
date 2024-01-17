
FROM node:20


WORKDIR /fast-delivery-back

COPY package*.json ./

RUN npm install


COPY . .


RUN npm install


EXPOSE 3001


CMD ["npm", "start"]