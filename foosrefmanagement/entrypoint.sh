#!/bin/sh

if [ -z "$ENVIRONMENT" ]; then echo 'Environment variable ENVIRONMENT must be specified. Exiting.'; exit 1; fi
if [ -z "$DEFAULT_DATABASE_HOST" ]; then echo 'Environment variable DEFAULT_DATABASE_HOST must be specified. Exiting.'; exit 1; fi
if [ -z "$DEFAULT_DATABASE_PORT" ]; then echo 'Environment variable DEFAULT_DATABASE_PORT must be specified. Exiting.'; exit 1; fi
if [ -z "$DEFAULT_DATABASE_NAME" ]; then echo 'Environment variable DEFAULT_DATABASE_NAME must be specified. Exiting.'; exit 1; fi
if [ -z "$DEFAULT_DATABASE_USER" ]; then echo 'Environment variable DEFAULT_DATABASE_USER must be specified. Exiting.'; exit 1; fi
if [ -z "$DEFAULT_DATABASE_PASSWORD" ]; then echo 'Environment variable DEFAULT_DATABASE_PASSWORD must be specified. Exiting.'; exit 1; fi
if [ -z "$DJANGO_SUPERUSER_TELEGRAM_ID" ]; then echo 'Environment variable DJANGO_SUPERUSER_TELEGRAM_ID must be specified. Exiting.'; exit 1; fi
if [ -z "$DJANGO_SUPERUSER_PASSWORD" ]; then echo 'Environment variable DJANGO_SUPERUSER_PASSWORD must be specified. Exiting.'; exit 1; fi
if [ -z "$TELEGRAM_BOT_API_TOKEN" ]; then echo 'Environment variable TELEGRAM_BOT_API_TOKEN must be specified. Exiting.'; exit 1; fi
if [ -z "$DJANGO_SECRET_KEY" ]; then echo 'Environment variable DJANGO_SECRET_KEY must be specified. Exiting.'; exit 1; fi
if [ -z "$APP_EXTERNAL_HOST" ]; then echo 'Environment variable APP_EXTERNAL_HOST must be specified. Exiting.'; exit 1; fi
if [ -z "$DJANGO_ALLOWED_HOSTS" ]; then echo 'Environment variable DJANGO_ALLOWED_HOSTS must be specified. Exiting.'; exit 1; fi

echo "Waiting for postgres..."

while ! nc -z $DEFAULT_DATABASE_HOST $DEFAULT_DATABASE_PORT; do
    sleep 0.1
done

echo "PostgreSQL started"

python manage.py migrate --no-input
python manage.py collectstatic --no-input --clear

gunicorn foosrefmanagement.wsgi:application --bind 0.0.0.0:8000