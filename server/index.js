// server/index.js
const express = require('express');
const bcrypt = require('bcrypt');
const session = require('express-session');
const db = require('./db');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());

// express-session middleware
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
    })
);

// Register endpoint
app.post('/register', async (req, res) => {
  try {
      const { username, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = { username, email, password: hashedPassword };
      db.users.push(user);
      req.session.userId = user.email;
      res.status(201).send();
  } catch (error) {
      res.status(500).send();
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find((u) => u.email === email);

  if (user && await bcrypt.compare(password, user.password)) {
      req.session.userId = user.email;
      res.send();
  } else {
      res.status(401).send();
  }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
      if (err) return res.status(500).send();
      res.send();
  });
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server nodemon changes!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});