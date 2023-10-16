# movies-explorer-api

[![en](https://img.shields.io/badge/lang-en-green.svg)](https://github.com/chepash/movies-explorer-api/blob/main/README.md)
[![ru](https://img.shields.io/badge/lang-ru-orange.svg)](https://github.com/chepash/movies-explorer-api/blob/main/README.ru.md)

![GitHub repo size](https://img.shields.io/github/repo-size/chepash/movies-explorer-frontend?color=yellow&style=flat-square) ![GitHub last commit](https://img.shields.io/github/last-commit/chepash/movies-explorer-frontend?color=blue&style=flat-square)  
Backend for my diploma project at Yandex Practicum.

[GitHub repository of Frontend part](https://github.com/chepash/movies-explorer-frontend)

## Hosting

- IP 158.160.26.221
- https://api.chepamovies.nomoredomains.monster

## Directories

- `/controllers` — folder containing user and movie controller files.
- `/errors` — folder with custom error class files.
- `/middlewares` — folder with user authorization check, logger, and error handler modules.
- `/models` — folder with user and movie schema description files.
- `/routes` — folder with router files.
- `/utils` — folder with project constants and validation functions.

## Project Launch

- `npm run start` — starts the server at [localhost:3000](http://localhost:3000/)
- `npm run dev` — starts the server at [localhost:3000](http://localhost:3000/) с `hot reload`;

## Application Functionality

- When the server responds successfully, it returns JSON.
- When the application starts, it connects to the MongoDB server at the address: mongodb://127.0.0.1:27017/bitfilmsdb.
- The application defines a user schema with the following required fields:

  - `name` - string from 2 to 30 characters.
  - `email` - string, a unique field.
  - `password` - string.

- The application defines a movie schema with the following required fields:

  - `country` - a string.
  - `director` - a string.
  - `duration` - a number.
  - `year` - a string.
  - `description` - a string.
  - `image` - a string.
  - `trailerLink` - a string.
  - `thumbnail` - a string.
  - `owner` - ObjectId.
  - `movieId` - a number.
  - `nameRU` - a string.
  - `nameEN` - a string.

- All user and movie schema fields are validated.
- Models with names `user` and `movie` are created and exported in schema files.
- When updating user data, `new:true` is passed in the `options`.
- The server responds to a request only once.
- The `password` field has no length limit since the password is stored as a hash.
- In the `createUser` controller, email and hashed password are stored in the database.
- User creation in the controller is done by calling the `create` method of the model without additional checks for the existence of the user, as the `email` field in the schema is marked as unique.
- There is a `login` controller that checks the email and password received in the request body.
- If the email and password are correct, the `login` controller creates a JWT with the `_id` property of the user in its payload.
- The JWT token is issued for a specific period (7 days) and is not given indefinitely.
- Upon successful authorization, the `login` controller returns the created token to the client via the `Set-Cookie` header.
- There is a `middlewares/auth.js` file with an `authorization middleware` to check the JWT.
- Routes `/signin` and `/signup` are not handled by the `authorization middleware`.
- When a valid JWT is present, the `authorization middleware` adds the token's `payload` to the request object and allows the request to proceed.
- A user cannot delete a movie from another user's favorites.
- The same user cannot add a new movie with the same `movieId`.

## Data Validation

- The user's `email` field is validated to match the email pattern using the `validator` and `celebrate` packages.
- The `image`, `trailerLink`, and `thumbnail` fields are checked with a regular expression as URLs. Additionally, they are validated against the pattern `/^https?:\/\/((www\.)|(?!www\.)).+\./i`. Validation occurs before calling the controller and accessing the database.
- Request bodies and, where necessary, request parameters and headers are validated according to specific schemas using `celebrate`.
- If a request does not match the schema, it is not passed to the controller, and the client receives a validation error.
- There is no data validation in the controllers if it is described using `celebrate`.

## The application handles requests to the following routes

- `POST /signin` - creates a JWT and returns it in a cookie.
- `GET /signout` - clears the client's cookies.
- `POST /signup` - creates a user with the data provided in the request body (all fields are required):

  - email
  - password,
  - name,

- `PATCH /users/me` - updates the user's profile.<br/>
- `GET /users/me` - returns the data of the authorized user.
- `GET /movies` - returns all movies added to the favorites of the authorized user.
- `POST /movies` - sets the owner field for a movie to the \_id taken from the payload, creates a movie with the fields provided in the request body (all fields are required):

  - country,
  - director,
  - duration,
  - year,
  - description,
  - image,
  - trailerLink,
  - thumbnail,
  - owner,
  - movieId,
  - nameRU,
  - nameEN,

- `DELETE /movies/:_id` - deletes a movie from favorites based on the `_id`.

## Error Handling in the Application

- If something goes wrong in any of the requests, the server returns a response with an error and the corresponding status:

  - `400` - incorrect data is provided in movie, user creation, or profile update methods.
  - `401` - incorrect login or password is provided. This error is also returned by the authorization middleware if an incorrect JWT is provided.
  - `403` - an attempt to delete a movie from someone else's favorites.
  - `404` - the movie or user is not found or a non-existent route is requested.
  - `409` - during registration or profile update, an `email` that already exists on the server is provided.
  - `500` - the default error. Accompanied by the message: "General problem with the server."

- Error statuses and response texts are stored in constants.
- Error constructor classes are created for all the errors mentioned above, inherited from `Error`.
- Duplicate error constructor classes with the same status code are not used.
- All controllers ensure the guaranteed sending of an error message.
- Centralized error handling is implemented in a unified middleware. All errors pass through the centralized `appErrorHandler`.
- Validation errors in input data are caught by the built-in celebrate error handler `celebrate.error()`.
- When handling errors in the `catch` block, they are not thrown using `throw` but are passed to the centralized error handler using `next`.

## Additional Details

- The project code was written using `eslint`.
- The `eslint` settings extend the airbnb-base configuration.
- The `Helmet` module is used to set security-related headers.
- A rate limiter is configured to limit the number of requests from a single IP address (a maximum of 100 requests in 15 minutes).
- Logging is set up as follows:
  - Requests and responses are logged in the `request.log` file before the rate limiter is applied.
  - Errors are logged in the `error.log` file.
  - The moment of server startup and the operating mode ("production" or "development") are recorded in the `app.log` file.
  - Log files are limited in size to 1MB.
  - When the size limit is reached, a new log file is created. A maximum of 5 log files is retained.
  - Log files are not added to the repository.
