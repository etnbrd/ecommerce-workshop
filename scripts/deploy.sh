#!/bin/bash

BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Build the discount-service image if required

if [ $BRANCH == "master" ]; then
  echo "building master branch"
  docker build -t discounts-service discounts-service
else
  docker build -t discounts-service:canary discounts-service
fi

# Tear down any previous containers
docker-compose down

# Launch the containers
POSTGRES_USER=postgres POSTGRES_PASSWORD=password docker-compose up -d

echo 'waiting for storedog to be ready'
until $(curl --output /dev/null --silent --head --fail http://0.0.0.0:3000); do
    printf '.'
    sleep 5
done
# Waiting a bit more to be safe
printf '.'
sleep 5