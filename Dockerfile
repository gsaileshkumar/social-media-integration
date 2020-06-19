FROM node:latest

WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN rm -rf node_modules
RUN npm install -g typescript
# RUN npm i core-util-is
RUN npm ci --only=production --silent

# Copy sources and build
COPY . .

RUN tsc

RUN npm run build

CMD ["node", "server/server.js"]