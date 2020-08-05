# build environment
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent
ADD ./ ./
RUN yarn build

# production environment
FROM nginx:stable-alpine
ADD entrypoint.sh /entrypoint.sh
COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx_default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT [ "sh", "/entrypoint.sh" ]