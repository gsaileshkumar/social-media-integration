FROM node:latest

WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN rm -rf node_modules
# RUN npm i core-util-is
# RUN npm ci --only=production --silent
RUN npm install

# Copy sources and build
COPY . .

RUN npm run build

CMD ["node", "server/server.js"]