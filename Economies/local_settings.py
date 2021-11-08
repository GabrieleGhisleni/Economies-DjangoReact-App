import os 
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2', 
        'NAME': 'spelldb',                      
        'USER': "ggabry",                     
        'PASSWORD': os.environ.get('ECONOMIES_DB_PSW'),                  
        'HOST': 'localhost',                      
        'PORT': '5432',                      
    }
}