FROM node:18-bullseye as bot
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .
ARG RAILWAY_STATIC_URL
ARG PUBLIC_URL
ARG PORT
ARG ports:
   - "192.168.10.4:PORT:PORT"
CMD ["npm", "start"]
