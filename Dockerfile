FROM node:latest AS build
WORKDIR /counterAppAngular
RUN npm cache clean --force
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

FROM nginx:latest AS ngi
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /counterAppAngular/dist/counter-app-angular /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080