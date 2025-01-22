# Todo API Service


![Test Coverage](https://img.shields.io/badge/coverage-62.22%25-orange)


## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Testing the APIs](#testing-the-apis)
- [Running Tests](#running-tests)

---

## Overview
This project is a simple Todo API built with NestJS and TypeORM. It allows users to create, retrieve, update, and delete todo items.

---

## Prerequisites
Ensure you have the following installed on your system:
- Node.js (v16 or later)
- Yarn package manager
- PostgreSQL (or another supported database configured in the project)

---

## Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies using Yarn:
   ```bash
   yarn install
   ```

---

## Environment Setup
1. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   NODE_ENV=development
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   DB_NAME=your_database_name
   ```

2. (Optional) Adjust the `PORT` variable if you want the application to run on a different port.

---

## Database Setup
1. Ensure that PostgreSQL (or the database of your choice) is running.

2. Create a new database:
   ```sql
   CREATE DATABASE your_database_name;
   ```

3. Since synchronization is on, the tables should be created when the application runs.

---

## Running the Application
1. Start the application in development mode:
   ```bash
   yarn start:dev
   ```

2. The application will start at `http://localhost:<PORT>` (default: `http://localhost:3000`).

---

## Testing the APIs
### Using Postman or cURL
1. **Get all todos:**
   ```bash
   GET /todos
   ```

2. **Get a todo by ID:**
   ```bash
   GET /todos/:id
   ```
   Example:
   ```bash
   GET /todos/1
   ```

3. **Create a todo:**
   ```bash
   POST /todos
   ```
   Request body:
   ```json
   {
     "Name": "Sample Todo",
     "Description": "This is a sample todo.",
     "Done": false
   }
   ```

4. **Update a todo by ID:**
   ```bash
   PATCH /todos/:id
   ```
   Request body:
   ```json
   {
     "Name": "Updated Todo",
     "Done": true
   }
   ```

5. **Delete a todo by ID:**
   ```bash
   DELETE /todos/:id
   ```

### Testing Example
Using cURL to create a todo:
```bash
curl -X POST http://localhost:3000/todos \
-H "Content-Type: application/json" \
-d '{
  "Name": "Write Documentation",
  "Description": "Write the README for the project",
  "Done": false
}'
```

---

## Running Tests
1. Run the unit tests:
   ```bash
   yarn test
   ```

2. Run the end-to-end tests:
   ```bash
   yarn test:e2e
   ```

3. Check the test coverage:
   ```bash
   yarn test:cov
   ```

---

## Troubleshooting
- Ensure the `.env` file is properly configured.
- Verify the database is running and accessible.
- Check the logs for detailed error messages using:
  ```bash
  yarn start:dev
  ```

