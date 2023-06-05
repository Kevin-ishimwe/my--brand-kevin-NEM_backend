FROM node:alpine

WORKDIR /app

COPY ./ ./

RUN npm install

EXPOSE 1256

CMD ["npm","run", "dev"]