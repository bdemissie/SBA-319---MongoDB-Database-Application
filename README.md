SBA 319 MongoDB Database Application

This is a Node.js application that connects to a MongoDB database hosted on MongoDB Atlas. The application provides routes for user sign-up, sign-in, change password, and admin functionality.


Install required dependencies

Express: For building the web application and handling routes.
dotenv: For loading environment variables from a .env file.
mongodb: For connecting to MongoDB.
ejs: For rendering views.
method-override: For overriding HTTP methods.
nodemon: For automatic server update

npm install express dotenv mongodb ejs method-override
npm install --save-dev nodemon

Environment Variables

PORT: The port on which the application will run (default is 3000).
USER: MongoDB Atlas username.
PASSWORD: MongoDB Atlas password.

Endpoints

Sign-Up
GET /sign-up: Renders the sign-up page.
POST /sign-up: Creates a new user in the database.

Sign-In
GET /sign-in: Renders the sign-in page.
POST /sign-in: Authenticates a user.

Change Password

GET /change-password: Renders the change password page.
POST /change-password: Changes the password of an authenticated user.

Admin

Sign In
Endpoint: GET /admin/sign-in
Description: Renders the admin sign-in page.

Show Available Admin APIs
Endpoint: POST /admin/sign-in
Description: Authenticates the admin user and returns a list of available admin APIs.
Request Body:
username (String): The admin username.
password (String): The admin password.

Get All Users
Endpoint: GET /admin/users
Description: Returns a list of users with their names, emails, and usernames.

Get User by ID
Endpoint: GET /admin/user/id/:id
Description: Retrieves a user's information by their ID.
Parameters:
id (String): The unique identifier of the user.

Delete User by ID
Endpoint: DELETE /admin/user/id/:id
Description: Deletes a user by their ID.
Parameters:
id (String): The unique identifier of the user.

Get User by Username
Endpoint: GET /admin/user/username/:username
Description: Retrieves a user's information by their username.
Parameters:
username (String): The username of the user.

Delete User by Username
Endpoint: DELETE /admin/user/username/:username
Description: Deletes a user by their username.
Parameters:
username (String): The username of the user.

Update Username
Endpoint: PATCH /admin/user/username/:username
Description: Updates a user's username.
Parameters:
username (String): The current username of the user.
Request Body:
newUsername (String): The new username to set for the user.

Update User Admin Privileges by ID
Endpoint: PATCH /admin/user/id/:id/:isadmin
Description: Updates the admin privileges of a user specified by their ID.
Parameters:
id (String): The unique identifier of the user.
isadmin (Boolean): The new admin status of the user (true for admin, false for non-admin).

Add New User
Endpoint: POST /admin/user/add
Description: Adds a new user to the database.
Request Body:
first_name (String): The first name of the user.
last_name (String): The last name of the user.
username (String): The username of the user.
email (String): The email address of the user.
password (String): The password for the user.
admin (Boolean, optional): The admin status of the user (default is false).
These endpoints should be protected and only accessible to authenticated admin users.








