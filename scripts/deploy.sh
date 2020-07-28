#!/bin/bash
# Build the discount-service image if required
docker build -t discounts-service discounts-service

# Launch the containers
POSTGRES_USER=postgres POSTGRES_PASSWORD=password docker-compose -p prod up -d