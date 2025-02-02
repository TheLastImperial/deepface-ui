FROM node:20-alpine AS builder
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . /app
RUN yarn build

FROM nginx:1.27.1-alpine-slim AS prod
COPY ./nginx/default.conf /etc/nginx/conf.d/
COPY ./nginx/nginx.conf /etc/nginx/
COPY --from=builder /app/dist/ /usr/share/nginx/html/
