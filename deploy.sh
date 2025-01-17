#!/bin/bash

# Step 1: Start Nginx with pre-certificate config
echo "Starting Nginx with temporary config..."
cp nginx/nginx.before.conf nginx/nginx.conf
# Start Nginx in non-SSL mode
docker compose up -d nginx

# Step 2: Run Certbot to obtain SSL certificate
echo "Requesting SSL certificate..."
docker run -it --rm \
    -v $(pwd)/certbot/etc:/etc/letsencrypt \
    -v $(pwd)/certbot/lib:/var/lib/letsencrypt \
    -v $(pwd)/nginx/html:/var/www/certbot \
    certbot/certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    -d chat.sh3lwan.dev

# Step 3: Switch to SSL-enabled config
echo "Switching to SSL-enabled config..."
cp nginx/nginx.after.conf nginx/nginx.conf

# Switch to SSL-enabled configuration
docker compose up --build -d --remove-orphans
