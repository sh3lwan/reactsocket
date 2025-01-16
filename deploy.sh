#!/bin/bash

# Start Nginx in non-SSL mode
docker-compose up -d nginx

# Run Certbot to generate certificates
docker run -it --rm \
    -v $(pwd)/certbot/etc:/etc/letsencrypt \
    -v $(pwd)/certbot/lib:/var/lib/letsencrypt \
    -v $(pwd)/nginx/html:/var/www/certbot \
    certbot/certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    -d chat.sh3lwan.dev

# Switch to SSL-enabled configuration
docker-compose restart nginx
