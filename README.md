# Task Manager API

This is a RESTful API for a simple task management application built with Node.js, Express.js, and PostgreSQL. The API supports user registration, login with JWT authentication, and CRUD operations on tasks.

---

## Features

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication and authorization
- Create, read, update, and delete (CRUD) tasks
- Input validation with zod
- CORS enabled
- PostgreSQL database connection with drizzle

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- drizzle
- bcryptjs
- jsonwebtoken
- zod
- cors
- dotenv
- nodemon
- cookie-parser

---

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone
   cd TodoListProject_BackEnd
   ```

2. Install dependencies:

   ```
   npm install
   # or
   yarn install
   ```

3. select a postgreSQL database service like neon or supabase and create new project in that.


4. Create a `.env` file in the root directory and add the following environment variables:

   ```
   PORT= the port that you want to system use.
   DATABASE_URL = you should get URL from your project in database servise that you    create project in.
   JWT_SECRET=your_jwt_secret_key
   ```

   - Make sure to replace the placeholders with your actual database value.
   - `JWT_SECRET` should be a strong, random string to secure your tokens.

5. Set up your PostgreSQL database:

   - create a folder thats name is drizzle

   - Generate migration for drizzle:

   ```
   npx drizzle-kit generate
   ```
   - Apply migration to set database schema to database service:

   ```
   npx drizzle-kit migrate
   ```
---

## Running the Server

Start the server by running:

```
npm start
```

Or, if you want live reload during development (with `nodemon` installed globally):

```
npm run dev
```

The server will start on the port specified in your `.env` file.

---

## API Endpoints

### Authentication

- **POST** `/api/register` — Register a new user

Request body:

```
{
  "username": "exampleuser",
  "password": "password123"
}
```

- **POST** `/api/login` — Authenticate user and get JWT

Request body:

```
{
  "username": "exampleuser",
  "password": "password123"
}
```
- **GET** `/api/get_user` — Authenticate user and response user email

- **GET** `/api/logout` — clear authentication cookie 


---

### Tasks (Authenticated)

Include the JWT token in the cookie:


- **GET** `/api/tasks` — Get all tasks for logged-in user

Request query parameter:

```
{
  "title": "exampletitle",
  "dueDate": "YYYY-MM-DD"
}
```

- **POST** `/api/tasks` — Create a new task

Request body example:

```
{
  "title": "example title",
  "description": "Details about the task",
  "due_date": "YYYY-MM-DD",
  "status": "example status"
}
```

- **PUT** `/api/tasks/:task_id` — Update a task by ID

Request body example:

```
{
  "title": "example title",
  "description": "Details about the task",
  "due_date": "YYYY-MM-DD",
  "status": "example status"
}
```

- **DELETE** `/api/tasks/:task_id` — Delete a task by ID

---

## Error Handling

- 400 Bad Request — validation errors or invalid input format
- 401 Unauthorized — no or invalid token provided
- 404 Not Found — resource not found (e.g., task or user not found)
- 500 Internal Server Error — unexpected server errors

---

## Notes

- Make sure the `JWT_SECRET` environment variable is set; otherwise, the server won't generate tokens.
- Passwords are hashed with bcrypt before storing in the database.
- All task routes require a valid JWT token.

---

## Testing

You can test the API endpoints using tools such as:

- [Postman](https://www.postman.com/)


