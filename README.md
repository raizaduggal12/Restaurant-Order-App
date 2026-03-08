# 🍽️ Restaurant Order App

A **Full Stack Restaurant Ordering Web Application** where users can sign up, log in, explore menu items, add them to a cart, and place food orders online.

Built using **Node.js, Express.js, MongoDB, HTML, CSS, and JavaScript**.

---

## 🚀 Features

• User **Signup & Login Authentication** using JWT  
• Secure **password hashing using Bcrypt**  
• Interactive **restaurant menu with Veg & Non-Veg items**  
• **Add to Cart functionality** with dynamic updates  
• **Place Orders** securely using protected API routes  
• Orders stored in **MongoDB database**  
• Clean and responsive UI with menu cards and food images  

---

## 🛠️ Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB
- Mongoose

**Authentication**
- JWT (JSON Web Tokens)
- Bcrypt

**Tools**
- VS Code
- MongoDB Compass
- Git & GitHub

---

## 📂 Project Structure
```
Restaurant-Order-App
│
├── backend
│ ├── config
│ │ └── db.js
│ │
│ ├── models
│ │ ├── User.js
│ │ └── order.js
│ │
│ └── server.js
│
├── frontend
│ ├── login.html
│ ├── signup.html
│ ├── menu.html
│ ├── menu.js
│ ├── style.css
│ └── images
│
├── package.json
└── README.md
```


---

## 🔐 Authentication Flow

1️⃣ User creates account (Signup)  
2️⃣ Password is hashed using **Bcrypt**  
3️⃣ User logs in  
4️⃣ Server generates **JWT Token**  
5️⃣ Token is used to access protected routes (like placing orders)

---

## 🎯 Future Improvements

• Payment Integration  
• Admin Dashboard for restaurant owners  
• Order Tracking System  
• Mobile Responsive UI improvements  
• Online Deployment (Render / Vercel)

---

## 👨‍💻 Author

**Raiza Duggal**
---

⭐ If you found this project useful, consider giving it a star!
