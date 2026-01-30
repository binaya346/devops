# STAGE 1: Build
FROM node:24-alpine AS build_stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# STAGE 2: Production (The Delivery)
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# copy static files from build stage
COPY --from=build_stage /app/dist .

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
