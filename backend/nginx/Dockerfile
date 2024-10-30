FROM staticfloat/nginx-certbot:latest
RUN usermod -aG nginx nginx
RUN rm -rf /etc/nginx/user.conf.d/*
COPY conf.d/ /etc/nginx/user.conf.d/
WORKDIR /app
RUN chown nginx:nginx -R /app