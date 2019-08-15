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




## Screenshot
Homepage:
![homepage](/screenshot/homepage.JPG)

Search Result:
![search-result](/screenshot/search-result.JPG)

Search Result 2:
![search-result-2](/screenshot/search-result-2.JPG)

List of Collection:
![list-of-collection](/screenshot/list-of-collection.JPG)

Collection Detail:
![collection-detail](/screenshot/collection-detail.JPG)

Add Collection:
![add-collection](/screenshot/add-collection.JPG)

Edit Collection:
![edit-collection](/screenshot/edit-collection.JPG)
