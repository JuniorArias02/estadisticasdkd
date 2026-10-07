# ── Node version fijada para consistencia entre devs y CI/CD ──
# NestJS 12 + TypeScript 6 requieren Node >= 22
# Cambia a node:22-alpine si prefieres LTS estable

# Stage 1: Build the application
FROM node:24-alpine AS builder

WORKDIR /usr/src/app

# Install openssl for Prisma
RUN apk add --no-cache openssl

# Copy package files and install dependencies
COPY package*.json ./
COPY prisma ./prisma/
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm ci

# Copy the rest of the application
COPY . .

# Generate Prisma client and build the NestJS app
RUN npx prisma generate
RUN npm run build

# Stage 2: Production image
FROM node:24-alpine AS production

WORKDIR /usr/src/app

# Install openssl for Prisma
RUN apk add --no-cache openssl

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install only production dependencies
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    npm ci --only=production

# Copy generated Prisma client from builder
COPY --from=builder /usr/src/app/node_modules/@prisma/client ./node_modules/@prisma/client

# Copy built application from builder
COPY --from=builder /usr/src/app/dist ./dist

# Expose the application port
EXPOSE 3000

# Run migrations and start the application
CMD [ "sh", "-c", "npx prisma migrate deploy && npm run start:prod" ]
