#!/bin/bash
# Build the discount-service image if required
docker build -t discounts-service discounts-service

# Tear down any previous containers
docker-compose down

# Launch the containers
POSTGRES_USER=postgres POSTGRES_PASSWORD=password docker-compose up -d

echo 'waiting for storedog to be ready'
until $(curl --output /dev/null --silent --head --fail http://0.0.0.0:3000); do
    printf '.'
    sleep 5
done
echo 'webserver responding, waiting a bit more to be safe'
sleep 10