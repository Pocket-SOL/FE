# React Dockerfile
FROM node:18 AS build
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

# Nginx로 전달
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
