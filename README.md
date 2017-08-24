#E-Skate API#
---
*A back-end RESTful API for an eCommerce web application that can be found at [E-Skate](https://eskate-frontend.herokuapp.com/)*

##Key Features##
---
-CRUD operations on
    -Item model
    -Store Settings model
    -Orders model
-AWS S3 asset storage
-MongoDB data storage
-Login route for Admin interface
-ToDo

###CRUD###
Not this type of ==CRUD==
>snow that is not packed down or groomed
***Item routes***
Creating a new item:
>Data type: multipart/form-data
==POST Request to==
```https://eskate-frontend.herokuapp.com/item```
>Required Fields:
>type: 'must be a string stating part or board'
>file: 'upload from local'
