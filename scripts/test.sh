#!/bin/bash

if [ -e 'discount.synthetics-ci.json' ]; then
  datadog-ci synthetics run-tests --apiKey "$DD_API_KEY" --appKey "$DD_APP_KEY"
end;