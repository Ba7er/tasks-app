**Task App API Docs**
----
  How to consume the app resources

* **URL**

  /users

* **Method:**
  
  

  `POST` 
  
*  **URL Params**

   None

   **Required:**
 
   none

   **Optional:**
    none

* **Data Params**

    <p>{
        "name":"Sami",
        "email": "Sami.dev@gmail.com",
        "password":"thebest4"
        }
    </p>

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{
    "user": {
        "age": 0,
        "_id": "5d73a9567888ac0017671880",
        "name": "hami",
        "email": "hami.dev@gmail.com",
        "createdAt": "2019-09-07T12:57:58.340Z",
        "updatedAt": "2019-09-07T12:57:58.388Z",
        "__v": 1
    },
    "token": "tokenstring"
}`
 
* **Error Response:**

  <_registering same user twice_>

  * **Code:** 400 bad request <br />
    **Content:** `{
    "driver": true,
    "name": "MongoError",
    "index": 0,
    "code": 11000,
    "errmsg": "E11000 duplicate key error collection: task-manager-api.users index: email_1 dup key: { : \"hami.dev@gmail.com\" }"
}`

  OR

  * **Code:** 400 bad request <br />
    **Content:** `{
    "errors": {
        "email": {
            "message": "Path `email` is required.",
            "name": "ValidatorError",
            "properties": {
                "message": "Path `email` is required.",
                "type": "required",
                "path": "email"
            },
            "kind": "required",
            "path": "email"
        }
    },
    "_message": "User validation failed",
    "message": "User validation failed: email: Path `email` is required.",
    "name": "ValidationError"
}`

* **URL**

  /users/me

* **Method:**
  
  

  `GET` 
  
*  **URL Params**

   <_Authorization Bearer fewfewkfwewewefewqrgbrewnmfw_>

   **Required:**
 
   none

   **Optional:**
    none

* **Data Params**

    <p>none</p>

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{
    "age": 0,
    "_id": "5d73a9567888ac0017671880",
    "name": "hami",
    "email": "hami.dev@gmail.com",
    "createdAt": "2019-09-07T12:57:58.340Z",
    "updatedAt": "2019-09-07T12:57:58.388Z",
    "__v": 1
}`
 
* **Error Response:**


  * **Code:** 401 Unauthorized <br />
    **Content:** `{
    "error": "please authenticate"
}`

* **URL**

  /users/me

* **Method:**
  
  

  `PATCH` 
  
*  **URL Params**

   none

   **Required:**
 
   none

   **Optional:**
    none

* **Data Params**

    <p>{
	"name": "Sami2",
	"password":"test124",
	"age":"32"
}</p>

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** `{
    "age": 32,
    "_id": "5d73acf1b73af00017db7fc6",
    "name": "Sami2",
    "email": "jack.dev@gmail.com",
    "createdAt": "2019-09-07T13:13:21.153Z",
    "updatedAt": "2019-09-07T13:17:02.484Z",
    "__v": 1
}`
 
* **Error Response:**


  * **Code:** 400 bar request <br />
    **Content:** `{
    "error": "Invalid updates"
}`

* **URL**

  /users/login

* **Method:**
  
  

  `POST` 
  
*  **URL Params**

   none

   **Required:**
 
   none

   **Optional:**
    none

* **Data Params**

    <p>{
	"email":"abodi@gmail.com",
	"password":"test124"
}</p>

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:**`{
    "user": {
        "age": 0,
        "_id": "5d73aeefb73af00017db7fc8",
        "name": "Jack1",
        "email": "jack2.dev@gmail.com",
        "createdAt": "2019-09-07T13:21:51.740Z",
        "updatedAt": "2019-09-07T13:22:16.816Z",
        "__v": 3
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDczYWVlZmI3M2FmMDAwMTdkYjdmYzgiLCJpYXQiOjE1Njc4NjI1MzZ9.2oXSBm947pXCw43CFUObhIYzu9qpjADjIQiN0u8QtKU"
}`  
 
* **Error Response:**


  * **Code:** 400 bar request <br />
    **Content:** 


* **URL**

  /users/logout

* **Method:**
  
  

  `POST` 
  
*  **URL Params**

   none

   **Required:**
 
   none

   **Optional:**
    none

* **Data Params**

    <p>none</p>

* **Success Response:**
  

  * **Code:** 200 <br />
    **Content:** 
 
* **Error Response:**
    none

  * **Code:** none<br />
    **Content:** 

  

## adding task enpoints to be continued 
