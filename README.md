## Overview
This is a full-stack multi-user blog application built with React and Node.js. It allows users to register, log in, create, edit, delete, and view blog posts, as well as manage categories.

## Features
- User Registration and Authentication
- JWT-based authentication
- User Profile Management
- CRUD operations for Blog Posts and Categories

## Tech Stack
- **Frontend:** React.js, React Router, Axios, CSS
- **Backend:** Node.js, Express.js, Sequelize, MySQL, bcrypt, JWT

## Getting Started
### Prerequisites

- Node.js and npm
- MySQL database

### Installation
1. **Clone the repository:**

```sh
git clone https://github.com/tracyfrempong/MultiUserBlogHub.git
cd MultiUserBlogHub
```

2. **Install dependencies:**

```sh
npm install
```

3. **Set up environment variables:**

Create a `.env` file with the following variables:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASS=root
DB_NAME=multiuser_blog
SECRET_TOKEN=your_jwt_secret
```

4. **Set up the database:**

Ensure your MySQL server is running and create a database named `multiuser_blog`.

5. **Run the backend server:**

```sh
npm run server
```

6. **Run the frontend development server:**

```sh
npm start
```

## License
This project is licensed under the MIT License.
