#!/bin/sh

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Check accessibility
# (This assumes you have a script or command to check accessibility)
echo "Checking accessibility..."
# Your accessibility check command here

# Start Gunicorn
echo "Starting Gunicorn..."
exec gunicorn tweetme.wsgi:application --bind 0.0.0.0:8000 --workers=3
