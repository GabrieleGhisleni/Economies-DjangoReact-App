release: python manage.py makemigrations && python manage.py migrate 
web: gunicorn Economies.wsgi --log-file -
