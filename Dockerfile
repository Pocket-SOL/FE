# React Dockerfile
FROM node:18 AS build
WORKDIR /app

ARG VITE_OPEN_BANK_ID
ARG VITE_CLIENT_SECRET
ARG VITE_SCHOOL_KEY
ARG VITE_BANK_TRANS_ID
# .env 파일 생성
RUN echo "VITE_OPEN_BANK_ID=${VITE_OPEN_BANK_ID}" >> .env \
    && echo "VITE_CLIENT_SECRET=${VITE_CLIENT_SECRET}" >> .env \
    && echo "VITE_SCHOOL_KEY=${VITE_SCHOOL_KEY}" >> .env \
    && echo "VITE_URI=${VITE_URI}" >> .env \
    && echo "VITE_BANK_TRANS_ID=${VITE_BANK_TRANS_ID}" >> .env 


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
