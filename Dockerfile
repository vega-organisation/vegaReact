FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build-storybook

FROM nginx:alpine

COPY --from=builder /app/storybook-static /usr/share/nginx/html

RUN echo 'server { \n\
  listen 6006; \n\
  location / { \n\
  root /usr/share/nginx/html; \n\
  index index.html index.htm; \n\
  try_files $uri $uri/ /index.html; \n\
  } \n\
  }' > /etc/nginx/conf.d/default.conf

EXPOSE 6006
