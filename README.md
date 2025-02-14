# task-api

A RESTful API built with Node.js, ExpressJS, and MongoDB to manage a simple task list with full CRUD functionality.

Features

#Create, Read, Update, and Delete tasks

#Custom task ID management

#MongoDB integration using Mongoose

#Proper error handling with meaningful messages

#Standard API responses

Prerequisites
Node.js
MongoDB


Setup Instructions

1️⃣ Clone the Repository

git clone <repository-url>
cd <project-folder>

2️⃣ Install Dependencies

npm install

3️⃣ Configure MongoDB Connection

In .env file change url as per need

MONGO_URI=mongodb://localhost:27017/todoDB
PORT=3000

Update PORT if needed.

4️⃣ Start the Server

npm start

The API will be available at http://localhost:3000/api


API supports the following endpoints:

Create a new task → POST /tasks
Retrieve all tasks → GET /tasks
Retrieve a specific task → GET /tasks/:id
Update a task → PUT /tasks/:id
Delete a task → DELETE /tasks/:id
