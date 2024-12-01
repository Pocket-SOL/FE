# React Dockerfile
FROM node:18 AS build
WORKDIR /app

ARG ENV_FILE_VARS
ENV ENV_FILE_VARS=$ENV_FILE_VARS

COPY ./package.json ./
RUN npm install
COPY . .

RUN npm run build
# Nginx로 전달
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/htmldho 
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
