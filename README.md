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

## CRUD  
---  

Not this type of CRUD  
> snow that is not packed down or groomed.

***Item Routes***  

**Creating a new item:**

- Data type  
 - multipart/form-data  
- POST Request to  
```https://eskate-frontend.herokuapp.com/item```  
- Required  
  - type: `'board'` or `'part'`
  - file: uploaded from local machine  
- Returns  
  - Object with new item KV pairs  

**Viewing all items:**  
- GET Request to  
```https://eskate-frontend.herokuapp.com/item```  
- Returns  
  - An Array of Objects  

**Updating an item:**  
- Data type  
 - multipart/form-data  
- PUT Request to  
```https://eskate-frontend.herokuapp.com/:id```  
  - id = `._id`

- Required  
  - type: 'board' or 'part'
  - file: uploaded from local machine  
- Returns  
  - Object with updated item KV pairs  

**Deleting an item:**  
- DELETE Request to  
```https://eskate-frontend.herokuapp.com/:id```  
  - id = `._id`  
- Returns
  - empty object and 204

***Store / Order Routes = ToDo***  


## AWS S3  
---  
> Images uploaded from a local machine are passed through the S3 middeleware. The file is stored in an S3 bucket and returns an AWS URI where the file is located. This URI is the value to the key `photoURI: `.

## MongoDB  
---  
> All (non-image) data passed through the 3 models (item, store settings, orders) is stored in an MLab bucket. Developers can set up their own data storage by including their DB path as the value to a `MDB_URI=` in a .env file.

## Admin Login  
---  
- Sign Up route  
  - Not included on the front-end. Intentionally kept private so only those with a username and password has access to any website changes.  


- Login route  
  - username and password sent through bearer auth cryptology for access verification.

## ToDo  
---  
- S3 upload accepting current URI or ~ photo coming soon ~ stock placeholder.  
 - This should fix update routes on all models.
- Fix JSON parse on POST item route.  
- Refactor to CSS or Material UI.
