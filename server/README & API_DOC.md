# curly-comment

## API Documentation

---
## REST API End Points

List of available endpoints: 

- `POST /register`
- `POST /login`

Routes that need authentication:

- `GET /user`
- `GET /comments`
- `POST /comments`
- `GET /comments/:id`
- `PUT /comments/:id`
- `DELETE /comments/:id`

&nbsp;

---

## 1. _*POST /login*_

_URL_
```
/login
```

_Method_
```
POST
```

_URL Params_
```
Not needed
```

_Request Headers_
```
Not needed
```

_Request Body_
```JSON
{
    "email": "<email>",
    "password": "<password>"
}
```

_Response (200 - OK)_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Response (400 - Bad Request)_
```JSON
{
	"message": "Invalid email or password"
}
```

## 2. _*POST /Register*_

_Description_
```
Register Users
```

_URL_
```
/register
```

_Method_
```
POST
```

_URL Params_
```
Not needed
```

_Request Headers_
```
Not needed
```

_Request Body_
```JSON
{
  "username": "<username>",
  "email": "<email>",
  "password": "<password>",
}
```

_Response (201 - Created)_
```JSON
{
	"acknowledged": true,
  "insertedId": "combination of alphanumeric and string"
}
```

_Response (400 - Bad Request)_
```JSON
{
	"message": "Please fill in all fields"
}
OR
{
  "message": "Invalid email format"
}
```

_Response (409 - Conflict)_
```JSON
{
	"message": "Email has been used by other user"
}
OR
{
	"message": "Username has been taken by other user"
}
```

## 3. _*GET /comments*_

_Description_
```
GET all comments from database.
```

_URL_
```
/comments
```

_Method_
```
GET
```

_URL Params_
```
Not needed
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200 - OK)_
```JSON
[
	{
		"_id": "627b3c0a248e427581423e50",
		"message": "....",
		"tag": "MongoDB",
		"UserId": "627a46960cd0417d7448cef4",
		"User": {
			"username": "example",
			"email": "testuser1@mail.com",
			"role": "User"
		}
	},
	{
		"_id": "627b44c65f5c846502cb1577",
		"message": ".....",
		"tag": "MongoDB",
		"UserId": "627a46960cd0417d7448cef4",
		"User": {
			"username": "example",
			"email": "testuser1@mail.com",
			"role": "User"
		}
	},
  ...
]
```

## 4. _*GET /user*_

_Description_
```
GET current log-on user profile.
```

_URL_
```
/user
```

_Method_
```
GET
```

_URL Params_
```
Not needed
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200 - OK)_
```JSON
{
  "_id": "example",
  "username": "....",
  "email": "example@mail.com",
  "role": "example",
}
```

## 5. _*POST /commments*_

_URL_
```
/comments
```

_Method_
```
POST
```

_URL Params_
```
Not needed
```

_Request Headers_
```JSON
{
  "Content-Type": "application/json",
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```JSON
{
  "message": "any rich text",
  "tag": "any tags"
}
```

_Response (200 - OK)_
```JSON
{
	"acknowledged": true,
	"insertedId": "example"
}
```

_Response (400 - Bad Request)_
```JSON
{
	"message": "Message cannot be empty"
}
OR
{
	"message": "Tag is required"
}
```

## 6. _*GET /commments/:id*_

_URL_
```
/comments/:id
```

_Method_
```
GET
```

_URL Params_
```
CommentId as id
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200 - OK)_
```JSON
[
	{
		"_id": "627b44c65f5c846502cb1577",
		"message": "Keren banget bisa belajar MongoDB langsung...",
		"tag": "MongoDB",
		"UserId": "627a46960cd0417d7448cef4",
		"User": {
			"username": "Goodcommenter",
			"email": "testuser1@mail.com",
			"role": "User"
		}
	}
]
```

_Response (404 - Bad Request)_
```JSON
{
	"message": "Comment not found"
}
```

## 7. _*PUT /commments/:id*_

_URL_
```
/comments/:id
```

_Method_
```
PUT
```

_URL Params_
```
CommentId as id
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```
{
  "message": "any rich text",
  "tag": "any tags"
}
```

_Response (200 - OK)_
```JSON
{
	"message": "Comment has been edited successfully"
}
```

_Response (404 - Bad Request)_
```JSON
{
	"message": "Comment not found"
}
OR
{
	"message": "Message cannot be empty"
}
OR
{
	"message": "Tag is required"
}
```

## 8. _*DELETE /commments/:id*_

_URL_
```
/comments/:id
```

_Method_
```
DELETE
```

_URL Params_
```
CommentId as id
```

_Request Headers_
```JSON
{
	"access_token": "<JWT_TOKEN>"
}
```

_Request Body_
```
Not needed
```

_Response (200 - OK)_
```JSON
{
	"message": "Comment has been deleted successfully"
}
```

_Response (404 - Bad Request)_
```JSON
{
	"message": "Comment not found"
}
```

### Global Error

_Response (401 - Not Authorized)_
```JSON
{
	"message": "Invalid Access Token"
}
```

_Response (403 - Forbidden)_
```JSON
{
	"message": "Forbidden"
}
```

_Response (500 - Internal Server Error)_
```JSON
{
	"message": "Internal Server Error"
}
```

