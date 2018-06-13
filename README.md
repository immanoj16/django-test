# Expense Calculator

### It is made up of using Django, Django rest framework, django rest framework jwt in backend and React, Redux and Bootstrap in frontend.

## Setup

To use this awesome application you need to follow the following steps - 

  * make sure you have `python-3.x`, `pipenv`, `Node-v8.11.2`
  * To install these follow the official sites of [pipenv](https://docs.pipenv.org/), [python](https://www.python.org/downloads/), [Node](https://nodejs.org/en/)
  * Clone this repo.
  ```
  git clone https://github.com/immanoj16/django-test.git
  ```
  * I assume you are in your `$Your dir`
  * then type `cd django-test`
  * So you will see this type of structure, I think
  ```
  django-test
  └───api
  |   |   admin.py
  |   |   apps.py
  |   |   __init__.py
  |   └───migrations
  |   |   |   ...
  |   |          
  |   |   models.py
  |   |   permissions.py
  |   |   serializers.py
  |   |   tests.py
  |   |   urls.py
  |   |   views.py
  │   
  |   db.sqlite3
  └───django_test
  │   │   __init__.py
  │   │   settings.py
  |   |   urls.py
  |   |   wsgi.py
  |
  |   manage.py
  |   package.json
  |   Pipfile
  |   Pipfile.lock
  └───public
  |   |   favicon.ico
  |   |   index.html
  |   |   manifest.html
  |
  |   README.md
  └───src
  │   └───actions
  │   |   │   authActions.js
  │   |   │   expenseActions.js
  │   |   │   types.js
  |   |
  |   |   App.css
  |   |   App.js
  |   |   App.test.js
  |   └───components
  |   |   └───auth
  |   |   |   |   Login.js
  |   |   |   |   Register.js
  |   |   └───common
  |   |   |   |   PrivateRoute.js
  |   |   |   |   TextFieldGroup.js
  |   |   └───dashboard
  |   |   |   |   Dashboard.js
  |   |   └───expense
  |   |   |   |   AddExpense.js
  |   |   |   |   Expense.js
  |   |   |   |   ExpenseList.js
  |   |   |   |   ExpenseModal.js
  |   |   └───layout
  |   |   |   |   Footer.js
  |   |   |   |   Landing.js
  |   |   |   |   Navbar.js
  |   |
  |   |   index.css
  |   |   index.js
  |   └───reducers
  |   |   |   authReducer.js
  |   |   |   errorReducer.js
  |   |   |   expenseReducer.js
  |   |   |   index.js
  |
  |   |   registerServiceWorker.js
  |   └───utils
  |   |   |   setAuthToken.js
  |   └───validation
  |   |   |   is-empty.js
  │   
  |   yarn.lock
  ```
  * Remove all the files from `migrations` folder except `__init__.py` and `__pycache__` folder
  * see all the commands of pipenv
  ```
  pipenv
  ```
  * create a python environment for python 3.x
  ```
  pipenv --three
  ```
  * In the project folder run
  ```
  pipenv shell
  ```
  * install all the dependencies for django project
  ```
  pipenv install --dev
  ```
  * install all the frontend dependencies
  ```
  npm install
  ```
  
  ## Build Process
  
  * make migrations and make sure delete all the files from `api/migrations` folder except `__init__.py`
  ```
  python3 manage.py makemigrations
  ```
  * run python migrate
  ```
  python3 manage.py migrate
  ```
  
  * create a super user
  ```
  python3 manage.py createsuperuser
  ```
  give username, email, and password
  
  * First build the frontend
  ```
  npm run build
  ```
  * run the django server
  ```
  python3 manage.py runserver
  ```
  * See `http://localhost:8000`
  * or run the frontend app
  ```
  npm run start
  ```
  * and see `http://localhost:3000`
  
## Testing
  * Produce coverage report for testing
  ```
  coverage run --source='.' manage.py test
  ```
  * Generate coverage report
  ```
  coverage html
  ```
  * for test
  ```
  python3 manage.py test
  ```
  * test the frontend
  ```
  npm run test
  ```
  
## Features
  * You can create account and login
  * After login you can create expenses with name, price and upload images
  * See all the expenses in a table manner
