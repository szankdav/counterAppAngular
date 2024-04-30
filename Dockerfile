FROM node:20-alpine AS build
WORKDIR /counterAppAngular
RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest AS ngi
COPY --from=build /counterAppAngular/dist/counter-app-angular /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf
EXPOSE 8080