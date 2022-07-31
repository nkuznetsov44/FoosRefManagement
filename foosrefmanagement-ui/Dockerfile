FROM node:alpine as build
RUN apk add gettext

ENV PATH /node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./
ARG TELEGRAM_BOT_NAME
RUN envsubst < src/appSettings.js.template > src/appSettings.js
RUN npm run build


FROM nginx:1.21-alpine

COPY --from=build /build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf.template /etc/nginx/templates/nginx.conf.template
COPY entrypoint.sh /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/entrypoint.sh
COPY static-media/ /usr/src/app/static-media/