FROM python:3.9.10-slim-buster

WORKDIR /urs/src/app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONBUFFERED=1

RUN apt-get update && \
apt-get install -y gcc postgresql libpq-dev && \
apt-get clean

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .

COPY ./entrypoint.sh .
RUN chmod +x /urs/src/app/entrypoint.sh