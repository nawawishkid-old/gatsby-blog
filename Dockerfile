FROM nginx

COPY --chown=www-data:www-data ./public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
