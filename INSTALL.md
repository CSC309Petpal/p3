# Download and Install
## Installation of tools required to run the project
1. Python3.10
  - Windows: https://www.python.org/downloads/
  - Mac using home brew: type the following command in terminal : brew install  python@3.10
  - ubuntu 
    sudo apt update
    sudo apt install python3.10
  - You need pip to install remaining packages. Check pip --version to confirm that you have it. 
    
2. Npm and nodejs. 
  - For mac/windows, it is available on https://nodejs.org/. Select the version and run the installer. 
  Check the version of it using node -v and npm -v.  
  - Make sure that you are using version 20.10.0 for nodejs and 10.2.3 for npm. 
  - For Linux /ubuntu, you can use for example, apt which is a package manager on Ubuntu to install nodejs and npm. 
    sudo apt update
    sudo apt install nodejs
    sudo apt install npm
3.  Pip. Pip will come within the python3 if you download python3.10. 

## Download and Installation of packages
1.  git clone/fetch from our markus repository https://markus.teach.cs.toronto.edu/git/2023-09/csc309/group_2275. and cd into our directory. 
2. Enter our frontend repository by using command in terminal : cd ./frontend 
3. Then type in command: npm install to install all required packages. 
4. npm start to run development server 
5. cd ./backend
6. pip3 install -r requirements.txt to install all required packages for django backend. 
7. python3 ./manage.py runserver to start the development server. 


# Deployment 

## Prerequisites

- An Amazon EC2 instance.
- Basic knowledge of Unix commands.

## Service Management Commands

These commands are useful for managing the services.

### Service Commands for Gunicorn:

- Stop Gunicorn service: `sudo systemctl stop gunicorn.service`
- Start Gunicorn service: `sudo systemctl start gunicorn.service`
- Check Gunicorn service status: `sudo systemctl status gunicorn.service`

### Service Commands for Nginx:

- Start Nginx: `sudo systemctl start nginx`
- Restart Nginx: `sudo systemctl restart nginx`
- Reload Nginx: `sudo systemctl reload nginx`
- Check Nginx status: `sudo systemctl status nginx`

## Setting Up Amazon EC2

1.**Start an EC2 instance**: Log into your AWS console and start a new EC2 instance.

2.**Retrieve Public IP**: Once your instance is running, note down the public IPv4 address.

3.**Configure Inbound Rules**:

- Go to the EC2 dashboard.
- Navigate to 'Security Groups' and modify the 'Inbound Rules'.
- Add a custom TCP rule to allow traffic on port 8000.

## Deploying the React Front-End

1.**Install and Update Nginx**:

- Update the package lists: `sudo apt-get update`
- Install Nginx: `sudo apt-get install nginx`

2.**Configure Nginx for React**:

- Create a configuration file in `/etc/nginx/sites-available`. Example content:

  ```nginx

  server {

      listen 80; -- Nginx is listening on port 80.  

      server_name [your_public_ip];


      location = /favicon.ico {

          access_log off;

          log_not_found off;

      }

      location /media/ {

          root /var/www/[your_project_folder]/petpal;

      }

      location / {

          root /var/www/[your_project_folder]/my-app/build;

          try_files $uri /index.html;

      }

  }

  ```
- Replace `[your_public_ip]` and `[your_project_folder]` with your actual IP address and project directory.

3.**Enable the Site**:

- Create a symbolic link to enable the site:

`ln -s /etc/nginx/sites-available/[app_config] /etc/nginx/sites-enabled/[config]`

4.** Start apache : `sudo systemctl start nginx` 


## Setting Up the Django Backend

1.**Configure Django**:

- Add your server’s IP address to `ALLOWED_HOSTS` in `settings.py`.
- Example:

  ```python
  ALLOWED_HOSTS = ['your_public_ip', 'localhost']
  ```

 
  ```

- Update `CORS_ALLOWED_ORIGINS` in `settings.py`.
- Example:

  ```python
  CORS_ALLOWED_ORIGINS = [

    "http://localhost:3000",

    "http://127.0.0.1:3000",

    "http://your_public_ip",

    ]
  ```
  

2.**Install and Configure Gunicorn**:

- Install Gunicorn: `pip install gunicorn`
- Run Gunicorn in the parent folder of `wsgi.py`: `gunicorn [your_project_name].wsgi:application --bind 0.0.0.0:8000`
- Replace `[your_project_name]` with the name of your Django project.

3. ** Make Gunicorn a service(optional): 
- Create a new service file for Gunicorn in the /etc/systemd/system/ directory.
- Add the following configuration to the file, adjusting paths and settings as needed for your application:

```
[Unit]
Description=gunicorn daemon
After=network.target

[Service]
User=username
Group=groupname
WorkingDirectory=/path/to/your/project
ExecStart=/path/to/gunicorn --workers 3 --bind unix:/path/to/your/project/gunicorn.sock myproject.wsgi:application

[Install]
WantedBy=multi-user.target

```
- You can start Gunicorn service to make it running even when the connection to the 
server through is down. 
- start Gunicorn service by using`sudo systemctl start gunicorn.service`

After following these steps, your React application should be accessible via your EC2 instance's public IP on port 80, and your Django application on port 8000. Remember to replace placeholders like `[your_public_ip]`, `[your_project_folder]`, and `[your_project_name]` with your actual details.

Now, the website is availale on the public IP address that amazon EC2 is on. 

Final note: The public IP address assigned on Amazon might change and thus it is important to use elastic IP address to bind to the instance. 