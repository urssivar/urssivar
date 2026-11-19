FROM node:24-trixie-slim

RUN apt-get update && apt-get install -y --no-install-recommends bash git curl ca-certificates && rm -rf /var/lib/apt/lists/*
ENV SHELL=/bin/bash

WORKDIR /workspace

# Cache layer for dependencies
COPY package*.json ./
RUN npm ci

# Copy rest of the files
COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev"]
