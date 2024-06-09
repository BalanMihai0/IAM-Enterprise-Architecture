FROM nginx:alpine

# Copy website files
COPY build/ /etc/nginx/html

# Replace default Nginx config
RUN rm /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf

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