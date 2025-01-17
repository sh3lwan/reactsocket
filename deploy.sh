#!/bin/bash

# step 1: start nginx with pre-certificate config
echo "starting nginx with temporary config..."
cp nginx/nginx.before.conf nginx/nginx.conf
# start nginx in non-ssl mode
docker compose up -d nginx

# Wait for nginx to be ready
echo "Waiting for nginx to be ready..."
for i in {1..10}; do
    if curl -s http://localhost > /dev/null; then
        echo "Nginx is ready."
        break
    fi
    echo "Nginx is not ready yet. Retrying in 2 seconds..."
    sleep 2
    if [ $i -eq 10 ]; then
        echo "Nginx did not become ready in time. Exiting."
        exit 1
    fi
done

# Step 2: Check for certbot/ directory
if [ -d "$(pwd)/certbot" ]; then
    echo "Certificate already exists. Skipping certbot step."
else
    echo "Requesting SSL certificate..."
    docker run -it --rm \
        -v $(pwd)/certbot/etc:/etc/letsencrypt \
        -v $(pwd)/certbot/lib:/var/lib/letsencrypt \
        -v $(pwd)/nginx/html:/var/www/certbot \
        certbot/certbot certonly \
        --webroot \
        --webroot-path=/var/www/certbot \
        -d chat.sh3lwan.dev
fi

# step 3: switch to ssl-enabled config
echo "switching to ssl-enabled config..."
cp nginx/nginx.after.conf nginx/nginx.conf

# switch to ssl-enabled configuration
docker compose down && docker compose up --build -d --remove-orphans
