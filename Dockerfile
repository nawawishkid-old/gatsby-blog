FROM node

RUN apt-get update && apt-get install -y nginx
RUN rm -rf /etc/nginx/sites-enabled/* \
    && ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log
RUN npm i -g gatsby-cli

ENV ROOT_DIR /usr/share/nginx/html

COPY --chown=www-data:www-data . ${ROOT_DIR}
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR ${ROOT_DIR}
VOLUME ${ROOT_DIR}
EXPOSE 80

CMD [ "sh", "-c", "npm i && gatsby build && nginx -g 'daemon off;'" ]