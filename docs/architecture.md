# Project Architecture

## Backend

The entrypoint is `server/index.js`, which initializes an Express app and listens on port 3000 (by default).

`server/app.js` connects relevant Express middleware and also serves the frontend.

`server/db` handles the connection to the database. There are two tables: a user can register as an `instructor` to manage their `student`s. The schema can be found in `server/db/seed.js`.

`server/auth` handles creating and verifying user accounts with JWT.

`server/api` handles the api endpoints. A valid token needs to be in the request headers in order to access these endpoints.
