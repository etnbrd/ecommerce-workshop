#!/bin/bash

docker build -t ads-service ads-service
docker build -t discounts-service discounts-service
docker build -t store-frontend store-frontend
docker build -t storedog storedog