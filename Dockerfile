# Gunakan node image
FROM node:18-alpine

# Set working dir
WORKDIR /app

# Copy package.json & lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source
COPY . .

# Build Next.js
RUN npm run build

# Jalankan Next.js
CMD ["npm", "run", "start"]

# Next.js default port
EXPOSE 3000
