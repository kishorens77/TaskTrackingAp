FROM node:alpine as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json . 
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/build .
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
