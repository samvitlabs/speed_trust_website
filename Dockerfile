# Multi-stage build that supports both dev hot-reload and prod builds
ARG NODE_ENV=production

FROM node:18-alpine AS base
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./

FROM base AS runtime
ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

EXPOSE 3000
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"development\" ]; then npm run dev; else npm run start; fi"]
