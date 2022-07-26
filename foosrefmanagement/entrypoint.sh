#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z $DEFAULT_DATABASE_HOST $DEFAULT_DATABASE_PORT; do
    sleep 0.1
done

echo "PostgreSQL started"

# python manage.py flush --no-input
python manage.py migrate --no-input
python manage.py collectstatic --no-input --clear
# python manage.py createsuperuser --no-input --telegram_user_id $DJANGO_SUPERUSER_TELEGRAM_USER_ID

gunicorn foosrefmanagement.wsgi:application --bind 0.0.0.0:8000
