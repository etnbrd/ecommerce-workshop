#!/bin/bash

echo 'test synthetics-CI'
datadog-ci synthetics run-tests --apiKey "$DD_API_KEY" --appKey "$DD_APP_KEY"
