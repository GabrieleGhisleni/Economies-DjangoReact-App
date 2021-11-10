release: python manage.py makemigrations && python manage.py migrate && python manage.py migrate --run-syncdb
web: gunicorn Economies.wsgi --log-file -
