#!/bin/bash

# step 1: start nginx with pre-certificate config
echo "starting nginx with temporary config..."
cp nginx/nginx.before.conf nginx/nginx.conf
# start nginx in non-ssl mode
docker compose up -d nginx

# Wait until nginx is up and healthy
#echo "Waiting for nginx to be ready..."
#while ! docker inspect --format='{{.State.Health.Status}}' $(docker ps -q --filter "name=nginx") | grep -q "healthy"; do
#    echo "Nginx is not ready yet. Retrying in 2 seconds..."
#    sleep 2
#done

# step 2: run certbot to obtain ssl certificate
echo "requesting ssl certificate..."
docker run -it --rm \
    -v $(pwd)/certbot/etc:/etc/letsencrypt \
    -v $(pwd)/certbot/lib:/var/lib/letsencrypt \
    -v $(pwd)/nginx/html:/var/www/certbot \
    certbot/certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    -d chat.sh3lwan.dev

# step 3: switch to ssl-enabled config
echo "switching to ssl-enabled config..."
cp nginx/nginx.after.conf nginx/nginx.conf

# switch to ssl-enabled configuration
docker compose down && docker compose up --build -d --remove-orphans
