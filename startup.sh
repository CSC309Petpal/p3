python3.10 -m venv venv
source venv/bin/activate
cd petpal
pip3 install -r requirements.txt
python3.10 ./manage.py makemigrations
python3.10 ./manage.py migrate
cd ../my-app
npm install

