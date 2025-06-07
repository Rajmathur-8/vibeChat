# VibeChat Backend Documentation

This document covers the backend of the VibeChat application, including API endpoints, request/response examples, authentication, and architecture.

---

## Table of Contents

- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
  - [Auth: Signup](#1-signup)
  - [Auth: Login](#2-login)
  - [Auth: Logout](#3-logout)
  - [Auth: Update Profile](#4-update-profile)
  - [Auth: Check Auth](#5-check-auth)
  - [Messaging: Get Users](#6-get-users-for-sidebar)
  - [Messaging: Get Messages](#7-get-messages)
  - [Messaging: Send Message](#8-send-message)
- [Authentication Middleware](#authentication-middleware)
- [Utilities](#utilities)
- [Error Handling](#error-handling)

---

## Project Structure

```
backend/
  └── src/
      ├── controllers/
      │   ├── auth.controller.js
      │   └── message.controller.js
      ├── lib/
      │   ├── cloudinary.js
      │   ├── db.js
      │   └── utils.js
      ├── middlewares/
      │   └── auth.middleware.js
      ├── models/
      │   ├── user.model.js
      │   └── message.model.js
      ├── routes/
      │   ├── auth.route.js
      │   └── message.route.js
      └── index.js
```

---

## Environment Variables

Create a `.env` file in `backend/` with:

```
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Database Schema

**User Model:**

```js
{
  fullName: String,   // required
  email: String,      // required, unique
  password: String,   // required, min 6 chars, hashed
  profilePic: String, // optional, Cloudinary URL
  timestamps: true
}
```

**Message Model:**

```js
{
  senderId: ObjectId,   // required, ref: User
  receiverId: ObjectId, // required, ref: User
  text: String,         // optional
  image: String,        // optional, Cloudinary URL
  video: String,        // optional, Cloudinary URL
  timestamps: true
}
```

---

## API Endpoints

### 1. Signup

**POST** `/api/auth/signup`

Registers a new user.

#### Request

```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "password": "secret123"
}
```

#### Response (201 Created)

```json
{
  "message": "User created successfully",
  "user": {
    "id": "665f1c...",
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "profilePic": null
  }
}
```

#### Error Responses

- `400`: Missing fields, password too short, or email already exists.
- `500`: Internal server error.

---

### 2. Login

**POST** `/api/auth/login`

Authenticates a user and sets a JWT cookie.

#### Request

```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

#### Response (200 OK)

```json
{
  "message": "User logged in successfully",
  "user": {
    "id": "665f1c...",
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "profilePic": null
  }
}
```

#### Error Responses

- `400`: Missing fields, user not found, or invalid credentials.
- `500`: Internal server error.

---

### 3. Logout

**POST** `/api/auth/logout`

Clears the JWT cookie.

#### Request

_No body required._

#### Response (200 OK)

```json
{
  "message": "User logged out successfully"
}
```

---

### 4. Update Profile

**PUT** `/api/auth/update-profile`

Updates the user's profile picture. **Requires authentication.**

#### Request

```json
{
  "profilePic": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

#### Response (200 OK)

```json
{
  "message": "Profile updated successfully",
  "user": {
    "id": "665f1c...",
    "fullName": "Jane Doe",
    "email": "jane@example.com",
    "profilePic": "https://res.cloudinary.com/your_cloud/image/upload/v..."
  }
}
```

#### Error Responses

- `400`: No profilePic provided.
- `401`: Unauthorized (missing/invalid token).
- `500`: Internal server error.

---

### 5. Check Auth

**GET** `/api/auth/check`

Returns the authenticated user's data. **Requires authentication.**

#### Request

_No body required. JWT cookie must be present._

#### Response (200 OK)

```json
{
  "_id": "665f1c...",
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "profilePic": "https://res.cloudinary.com/your_cloud/image/upload/v...",
  "createdAt": "2024-06-06T12:34:56.789Z",
  "updatedAt": "2024-06-06T12:34:56.789Z",
  "__v": 0
}
```

#### Error Responses

- `401`: Unauthorized (missing/invalid token).
- `500`: Internal server error.

---

### 6. Get Users for Sidebar

**GET** `/api/message/users`

Returns all users except the currently authenticated user. **Requires authentication.**

#### Request

_No body required. JWT cookie must be present._

#### Response (200 OK)

```json
[
  {
    "_id": "665f1c...",
    "fullName": "John Smith",
    "email": "john@example.com",
    "profilePic": "https://res.cloudinary.com/your_cloud/image/upload/v...",
    "createdAt": "...",
    "updatedAt": "...",
    "__v": 0
  },
  ...
]
```

#### Error Responses

- `401`: Unauthorized (missing/invalid token).
- `500`: Internal server error.

---

### 7. Get Messages

**GET** `/api/message/:id`

Returns all messages between the authenticated user and the user with the given `:id`. **Requires authentication.**

#### Request

_No body required. JWT cookie must be present._

#### Response (200 OK)

```json
[
  {
    "_id": "666a1b...",
    "senderId": "665f1c...",
    "receiverId": "665f1d...",
    "text": "Hello!",
    "image": null,
    "video": null,
    "createdAt": "2024-06-07T10:00:00.000Z",
    "updatedAt": "2024-06-07T10:00:00.000Z",
    "__v": 0
  },
  ...
]
```

#### Error Responses

- `401`: Unauthorized (missing/invalid token).
- `500`: Internal server error.

---

### 8. Send Message

**POST** `/api/message/send/:id`

Sends a message to the user with the given `:id`. **Requires authentication.**

#### Request

```json
{
  "text": "Hello!",
  "image": "data:image/png;base64,...",   // optional, base64 string
  "video": "data:video/mp4;base64,..."   // optional, base64 string
}
```

#### Response (200 OK)

```json
{
  "_id": "666a1b...",
  "senderId": "665f1c...",
  "receiverId": "665f1d...",
  "text": "Hello!",
  "image": "https://res.cloudinary.com/your_cloud/image/upload/v...", // if image sent
  "video": "https://res.cloudinary.com/your_cloud/video/upload/v...", // if video sent
  "createdAt": "2024-06-07T10:00:00.000Z",
  "updatedAt": "2024-06-07T10:00:00.000Z",
  "__v": 0
}
```

#### Error Responses

- `400`: Cannot send an empty message (no text, image, or video).
- `401`: Unauthorized (missing/invalid token).
- `500`: Internal server error or media upload failed.

---

## Authentication Middleware

- Checks for JWT in cookies.
- Verifies token and attaches user to `req.user`.
- Returns `401` if token is missing, invalid, or user not found.

---

## Utilities

- **Password Hashing:** Uses bcryptjs for secure password storage.
- **JWT Token:** Created and set as HTTP-only cookie for 7 days.
- **Cloudinary Integration:** Handles image/video uploads for profile pictures and messages.

---

## Error Handling

- All endpoints return appropriate HTTP status codes and error messages.
- Server errors are logged and return a generic message to the client.

---

## Notes

- All protected routes require the JWT cookie.
- Use HTTPS and set `NODE_ENV=production` for secure cookies in production.
- Images and videos must be sent as base64-encoded strings.

---