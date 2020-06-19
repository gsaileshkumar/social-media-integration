FROM node:lts-alpine3.12

WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN rm -rf node_modules
RUN npm install

# Copy sources and build
COPY . .

RUN npm run build

CMD ["node", "./dist/server.js"]