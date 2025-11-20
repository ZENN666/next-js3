# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package.json & lock
COPY package*.json ./

# Install all dependencies (dev + prod) karena butuh build
RUN npm install

# Copy source code
COPY . .

# Build Next.js
RUN npm run build

# Stage 2: Production image
FROM node:18-alpine
WORKDIR /app

# Copy package.json & node_modules dari builder
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

# Copy built Next.js app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Set environment
ENV NODE_ENV=production

# Expose Next.js default port
EXPOSE 3000

# Start Next.js
CMD ["npm", "run", "start"]
