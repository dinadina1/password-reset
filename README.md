# Password Reset Flow

<p>The Project contains code for an API that manages the password reset flow. It includes endpoints for registration, login, retrieving the current user, logout, forgot password, and password reset, along with email verification. </p>


#### API Documentation: https://documenter.getpostman.com/view/33767617/2sA3JDiRA2

#### Render Base URL: https://password-reset-qh1e.onrender.com

<br>

### npm packages:
<ul>
  <li>nodejs</li>
  <li>bcrypt</li>
  <li>cors</li>
  <li>dotenv</li>
  <li>express</li>
  <li>jsonwebtoken</li>
  <li>mongodb</li>
  <li>nodemailer</li>
  <li>nodemon</li>
</ul>
<br>


#### To start the project, use the following command:

```
npm start
```

#### To install all dependencies for the project, use the following command:

```
npm install
```
# API Endpoins:
## Register user
### Method: POST 
<p>URL: https://password-reset-qh1e.onrender.com/register</p>
<p>Description: Registers a new user with the provided name, email, password, and phone number.</p>

<br>

## Login user
### Method: POST
<p>URL: https://password-reset-qh1e.onrender.com/login</p>
<p>Description: Logs in an existing user with the provided email and password.</p>

<br>

## Logout user
### Method: GET
<p>URL: https://password-reset-qh1e.onrender.com/logout</p>
<p>Description: Logs out the currently logged-in user.</p>

<br>

## Get user
### Method: GET
<p>URL: https://password-reset-qh1e.onrender.com/getUser</p>
<p>Description: Retrieves the details of the currently logged-in user.</p>

<br>

## Forgot password verify email
### Method: POST
<p>URL: https://password-reset-qh1e.onrender.com/forgot-password</p>
<p>Description: Sends a password reset code to the provided email address for password reset.</p>

<br>

## Reset Password
### Method: POST
<p>URL: https://password-reset-qh1e.onrender.com/reset-password/</p>
<p>Description: Resets the user's password with the provided new password and password reset code.
</p>
