FROM nginx:alpine

# Copy website files
COPY build/ /etc/nginx/html

# Copy Nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy SSL certificate files
COPY ./extra/fullchain.pem /etc/nginx/certs/fullchain.pem
COPY ./extra/privkey.pem /etc/nginx/certs/privkey.pem

# Set file permissions  
RUN chown nginx:nginx /etc/nginx/certs/fullchain.pem
RUN chown nginx:nginx /etc/nginx/certs/privkey.pem

# Expose HTTP port 
EXPOSE 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]