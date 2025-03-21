# Task Manager API

This is a Task Manager API built with Node.js, Express, and Sequelize. It allows users to create, read, update, and delete tasks. The API uses PostgreSQL as the database and supports user authentication.

## Prerequisites

- Node.js
- npm
- PostgreSQL

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Savitar465/task-manager-express.git
    cd task-manager-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables:
    ```env
    DB_NAME=your_database_name
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_HOST=your_database_host
    PORT=your_port
    ```

4. Run the database migrations:
    ```sh
    npx sequelize-cli db:migrate
    ```

## Running the Server

Start the server with the following command:
```sh
npm start
```
The server will run on the port specified in the .env file or default to port 3000.

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
### Tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks for the authenticated user
- `GET /api/tasks/:id` - Get a specific task by ID
- `PUT /api/tasks/:id` - Update a task by ID
- `DELETE /api/tasks/:id` - Delete a task by ID
## Models
### Task
- `id` - UUID, primary key
- `title` - String, required
- `description` - Text, optional
- `status` - Enum ('pending', 'in_progress', 'completed'), default is 'pending'
- `dueDate` - Date, optional
- `userId` - UUID, foreign key to User
### User
- `id` - UUID, primary key
- `email` - String, required
- `username` - String, required
- `password` - String, required
## License
This project is licensed under the MIT License.