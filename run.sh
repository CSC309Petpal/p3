source venv/bin/activate
cd petpal
python3.10 manage.py makemigrations
python3.10 manage.py migrate
python3.10 manage.py runserver