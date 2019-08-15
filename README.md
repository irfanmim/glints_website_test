# glints_website_test
# Restaurants Website

## Frontend (React)
Library:
  - react-router-dom
  - axios
  - @material-ui/core
  - @material-ui/icons
  - react-select

### Run
```sh
$ npm start
```

### Screenshot
![homepage](/screenshot/homepage.JPG)


## Backend (Django)
Library:
  - Django Rest Framework

### Run
```sh
$ python manage.py runserver
```

### API Documentation
| URI | Method |
| ------ | ------ |
| /restaurant/ | GET, POST |
| /restaurant/{id}/ | GET, PUT, DELETE |
| /collection/ | GET, POST |
| /collection/{id}/ | GET, PUT, DELETE |
| /restaurantByName?keyword={keyword} | GET |
| /restaurantByDate?day={day}&hour={hour}&minute={minute} | GET |
| /restaurantOption | GET |



