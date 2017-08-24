# E-Skate API
---
*A back-end RESTful API for an eCommerce web application that can be found at [E-Skate](https://eskate-frontend.herokuapp.com/)*

## Key Features  
---
- CRUD operations on
    - Item model
    - Store Settings model
    - Orders model
- AWS S3 asset storage
- MongoDB data storage
- Login route for Admin interface
- ToDo

### CRUD  
Not this type of == CRUD ==
> snow that is not packed down or groomed

*** Item Routes ***  

** Creating a new item: **

- Data type  
 - multipart/form-data  
- ==POST== Request to  
 -
```https://eskate-frontend.herokuapp.com/item```  
- Required  
  - type: 'board' or 'part'
  - file: uploaded from local machine  
- Returns  
  - Object with new item KV pairs  

** Viewing all items: **  
- ==GET== Request to  
 -
```https://eskate-frontend.herokuapp.com/item```  
- Returns  
  - An Array of Objects  

** Updating an item: **  
- Data type  
 - multipart/form-data  
- ==PUT== Request to  
 -
```https://eskate-frontend.herokuapp.com/:id```  
  - id = `._id`

- Required  
  - type: 'board' or 'part'
  - file: uploaded from local machine  
- Returns  
  - Object with updated item KV pairs  

** Deleting an item: **  
- ==DELETE== Request to  
 -
```https://eskate-frontend.herokuapp.com/:id```  
  - id = `._id`  
- Returns
  - empty object and 204
