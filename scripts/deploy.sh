#!/bin/bash
# Build the discount-service image if required
docker build -t discounts-service discounts-service

# Tear down any previous containers
docker-compose down

# Launch the containers
POSTGRES_USER=postgres POSTGRES_PASSWORD=password docker-compose up -d