# Simple-CRUD-Review-API
with Login Register

# service are running well if
- GET `/v1` check Api connection
- POST `/v1/register` register user
- POST `/v1/login` Login user (need "username" and "password" in body)
- GET `/v1/wisata` get all destination data
- POST `/v1/wisata` create destination data
- GET `/v1/wisata/[id]` get a destination data by id
- PUT `/v1/wisata/[id]` edit a destination data by id
- DELETE `/v1/wisata/[id]` delete a destination data with id
- POST `/v1/wisata/[id]/review` create review in destination data
- GET `/v1/review/[idReview]` get a review data by idReview
- PUT `/v1/review/[idReview]` edit a review data by idReview
- DELETE `/v1/review/[idReview]` delete a review data by idReview

# Testing API : http://3.131.38.123:3000/v1/
