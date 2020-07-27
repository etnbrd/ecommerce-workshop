FROM python:3.7.4-alpine3.9
RUN apk add build-base eudev-dev cython postgresql-dev linux-headers
WORKDIR /app
COPY requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
ADD . /app