# 🚀 Advanced Authentication System API

This is a robust, production-ready **Authentication & Authorization System** built with **Node.js**, **Express**, and **MongoDB**. It features a secure JWT-based flow with Access and Refresh tokens stored in HttpOnly cookies, ensuring a seamless and secure User Experience (UX).

---

## ✨ Key Features

- **🔐 Multi-layered Authentication:** Secure Signup and Login flows.
- **🛡️ JWT Strategy:** Implementation of Access Tokens and Refresh Tokens.
- **🍪 Cookie-Based Security:** Tokens are stored in `HttpOnly`, `Secure`, and `SameSite` cookies to prevent XSS and CSRF attacks.
- **📧 OTP Verification:** Email activation system using One-Time Passwords.
- **✅ Strict Validation:** All incoming data is validated using **Joi** schemas.
- **🛠️ Protected Routes:** Middleware-based authorization to secure sensitive endpoints.
- **🌐 Production Ready:** Fully configured for **CORS** and ready for deployment on **Vercel**.

---

## 📍 API Endpoints

The API is organized under the `/api/auth` prefix.

### 🔓 Public Endpoints
| Method | Endpoint | Description | Validation |
| :--- | :--- | :--- | :--- |
| **POST** | `/signup` | Create a new user account | `signupSchema` |
| **POST** | `/login` | Authenticate user & receive cookies | `loginSchema` |
| **POST** | `/generate-otp` | Request a new OTP for email verification | - |
| **POST** | `/verify-email` | Activate account using the sent OTP | - |
| **POST** | `/generatenewaccesstoken` | Refresh the expired Access Token | - |

### 🔐 Private Endpoints (Authorization Required)
*These routes require a valid `accessToken` cookie.*

| Method | Endpoint | Description | Middleware |
| :--- | :--- | :--- | :--- |
| **GET** | `/me` | Get current logged-in user details (for User Card) | `protect` |
| **POST** | `/logout` | Clear cookies and invalidate session | `protect` |

---

## 🛠️ Tech Stack

- **Backend:** Node.js & Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Security:** Bcrypt (Hashing), JWT (Tokens), Crypto (Hashing refresh tokens)
- **Validation:** Joi
- **Deployment:** Vercel

---

## 🚀 Installation & Local Setup

1. **Clone the repository:**
```bash
git clone [https://github.com/mena-emad/Auth-System.git](https://github.com/mena-emad/Auth-System.git)
cd Auth-System
```
2. **Install dependencies:**
```bash
npm install
```
3. Environment Variables:
- Create a `.env` file in the root directory and add:
```bash
PORT=5000
MONGO_URL=your_mongodb_atlas_connection_string
JWT_AT_SECRET=your_ultra_secret_access_key
JWT_RT_SECRET=your_ultra_secret_refresh_key
EMAIL=your_email
PASSWORD=your_app_password
```
4. **Run the server:**
```bash
npm start
```
`or`
```bash
nodemone
```
