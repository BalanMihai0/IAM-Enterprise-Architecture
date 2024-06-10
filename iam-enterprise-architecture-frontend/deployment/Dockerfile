FROM nginx:alpine

# Copy website files
COPY build/ /etc/nginx/html

# Replace default Nginx config
RUN rm /etc/nginx/nginx.conf
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port 
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]