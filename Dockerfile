FROM node:latest AS build
WORKDIR /counterAppAngular
RUN npm cache clean --force
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:latest AS ngi
COPY /nginx.conf  /etc/nginx/nginx.conf
COPY --from=build /counterAppAngular/dist/counter-app-angular /usr/share/nginx/html