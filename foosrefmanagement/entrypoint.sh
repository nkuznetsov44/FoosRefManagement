#!/bin/sh

echo "Waiting for postgres..."

while ! nc -z $DEFAULT_DATABASE_HOST $DEFAULT_DATABASE_PORT; do
    sleep 0.1
done

echo "PostgreSQL started"

# python manage.py flush --no-input
python manage.py migrate --noinput
python manage.py collectstatic --no-input --clear
python manage.py createsuperuser --noinput

exec "$@"