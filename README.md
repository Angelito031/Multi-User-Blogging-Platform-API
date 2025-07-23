# Multi-User Blogging Platform API

**A RESTful API enabling multi-user blogging capabilities**  
Built with Node.js, Express, PostgreSQL, JWT.

---

## 🔍 Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Quick Start](#quick-start)
4. [API Endpoints](#api-endpoints)
5. [Authentication & Authorization](#auth)
6. [Database Schema](#database-schema)
7. [Contributing](#contributing)
8. [License](#license)

---

## 🧩 Features

- **User management**: support for multi-user sign-up and login
- **Blog operations**: create, read, update, and delete posts
- **Comment operations**: create, read, update, and delete posts
- **Role differentiation**: author vs. editor vs. reader capabilities

---

## 🚀 Tech Stack

- **Server**: Node.js with Express
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt (password hashing)

---

## ⚙️ Quick Start

1. **Clone the repo**

   ```bash
   git clone https://github.com/Angelito031/Multi-User-Blogging-Platform-API.git
   cd Multi-User-Blogging-Platform-API
   ```

2. **Install dependencies**

   ```bash
   npm install     # or yarn install
   ```

3. **Set environment variables** (create a `.env` file)

   ```env
   PORT = "3000"

   #Database Env
   DBNAME = "MUBloggingDB"
   DBHOST = "localhost"
   DBUSER = "postgres"
   DBPASSWORD= "add here your db password"
   DBPORT = "5432"

   #JWT SECRETS
   #ACCESS AND REFRESH TOKEN MUST HAVE DIFFERENT CHARACTERS THIS INCLUDE SYMBOLS AND NUMBERS
   ACCESS_TOKEN_SECRET= "ADD HERE YOU SECRET KEY"
   REFRESH_TOKEN_SECRET="ADD HERE YOU REFRESH SECRET KEY"

   ```
   
4. **Start the API server**
   ```bash
   node index.js   
   ```

---

## 🧭 API Endpoints

All endpoint must have a `/api` e.g. `/api/blogs` or `/api/auth/login`.

### Authentication

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| POST   | `/auth/refresh` | Refresh JWT Token      |
| POST   | `/auth/login`   | Login and receive JWT  |
| POST   | `/auth/logout`  | Logout and destroy JWT |

### Users

| Method          | Endpoint     | Description                                                                                |
| --------------- | ------------ | ------------------------------------------------------------------------------------------ |
| GET/POST/DELETE | `/users`     | Get All profiles (admin & editor), Create (admin & reader) and Delete All Profiles (admin) |
| GET/PUT/DELETE  | `/users/:id` | Get Profile by ID (All Roles), Put (admin) and Delete Profiles by ID (All Roles)           |

### Blogs

| Method | Endpoint     | Description               |
| ------ | ------------ | ------------------------- |
| POST   | `/blogs`     | Author: create a new blog |
| GET    | `/blogs`     | List all blogs            |
| GET    | `/blogs/:id` | Get blog by ID            |
| PUT    | `/blogs/:id` | Author: update own blog   |
| DELETE | `/blogs/:id` | Author: delete own blog   |

---

## 🔐 Authentication & Authorization

- Uses **JWT** via `Authorization: Bearer <token>`
- Passwords are securely hashed with **bcrypt**
- Role-based access controls:
  - **Authors** can manage (create/edit/delete) _their own_ blogs
  - **Readers** have read-only access

---

## 🛠️ Contributing

1. Fork the repository
2. Create a feature or bugfix branch: `git checkout -b feature/NEW-FEATURE`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to your branch: `git push origin feature/NEW-FEATURE`
5. Open a Pull Request with a clear description

---

## 📝 License

This project is licensed under the **MIT License** – feel free to use and modify as needed.
