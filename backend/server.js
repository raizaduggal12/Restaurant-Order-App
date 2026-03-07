const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const connectDB = require('./config/db');
const Order = require('./models/order');
const User = require('./models/User');

const app = express();
const PORT = 3000;

const SECRET = "restaurantsecretkey";


// =========================
// MIDDLEWARE
// =========================
app.use(cors());
app.use(express.json());

// serve frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

// connect database
connectDB();


// =========================
// SIGNUP ROUTE
// =========================
app.post('/signup', async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (error) {

    res.status(500).json({ message: "Signup failed" });

  }

});


// =========================
// LOGIN ROUTE
// =========================
app.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // generate JWT token
    const token = jwt.sign(
      { id: user._id },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });

  } catch (error) {

    res.status(500).json({ message: "Login failed" });

  }

});


// =========================
// AUTH MIDDLEWARE
// =========================
function auth(req, res, next) {

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {

    const verified = jwt.verify(token, SECRET);

    req.user = verified;

    next();

  } catch (err) {

    res.status(401).json({ message: "Invalid token" });

  }

}


// =========================
// PLACE ORDER (PROTECTED)
// =========================

app.post('/submit-order', auth, async (req, res) => {
  console.log("Order request:", req.body);
  try {

    const { items } = req.body;

    const order = new Order({
      userId: req.user.id,
      items
    });

    await order.save();

    res.json({ message: "✅ Your order has been placed successfully!" });

  } catch (error) {

    res.status(500).json({ message: "Error placing order" });

  }

});


// =========================
// GET USER ORDERS
// =========================
app.get('/my-orders', auth, async (req, res) => {

  try {

    const orders = await Order.find({ userId: req.user.id });

    res.json(orders);

  } catch (error) {

    res.status(500).json({ message: "Error fetching orders" });

  }

});


// =========================
// START SERVER
// =========================
app.listen(PORT, () => {

  console.log(`Server running on http://localhost:${PORT}`);

});