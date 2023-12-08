python3.10 -m venv venv
source venv/bin/activate
cd petpal
pip install -r requirements.txt
python3.10 ./manage.py makemigrations
python3.10 ./manage.py migrate
cd ../

