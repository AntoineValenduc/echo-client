FROM node:20-alpine

RUN apk add --no-cache \
    bash \
    git

WORKDIR /echo-client

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 8081

CMD ["npx", "expo", "start", "--localhost"]
