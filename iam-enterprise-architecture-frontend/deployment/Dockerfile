FROM nginx:alpine

# Copy website files
COPY build/ /etc/nginx/html

# Replace default Nginx config
RUN rm /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Copy SSL certificate files
COPY ./extra/certificate.crt /etc/nginx/certs/certificate.crt
COPY ./extra/private.key /etc/nginx/certs/private.key

# Set file permissions  
RUN chown nginx:nginx /etc/nginx/certs/certificate.crt
RUN chown nginx:nginx /etc/nginx/certs/private.key

# Expose HTTP port 
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]