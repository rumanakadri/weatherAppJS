#22-slim is the version
#package*.json will copy all package to docker including lock files.
FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV PORT=5000
CMD ["node", "app.js"]