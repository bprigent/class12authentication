// server/index.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const db = require('./db');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(cors());

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
    // extract data from request body
    const { username, email, password } = req.body;

    // Check if the email is already in use, if so, return error
    const emailInUse = db.users.some((user) => user.email === email);
    if (emailInUse) {
      return res.status(400).json({ message: 'This email is already in use' });
    }

    // Generate a hashed password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a user object with hased password to be sent to database
    const newUserObject = { username: username, email: email, password: hashedPassword };

    // add newUserObject to database
    db.users.push(newUserObject);

    // set the session user id to be the email
    req.session.userId = newUserObject.email;

    // Set the status of the response
    res.status(201).json({ message: 'Registration successful' });

  } catch (error) {
    // if there is an error, send an error
    res.status(500).json({ message: 'Oops, Unknown error, please try again' });
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  // extract data from body
  const { email, password } = req.body;

  // find user data in database
  const userObject = db.users.find((u) => u.email === email);

  // if there is a user, and the password is correct, then
  if (userObject && await bcrypt.compare(password, userObject.password)) {
    // set session user id to be the email, to maintain the user session across multiple requests
    req.session.userId = userObject.email;
    // send user data back to client
    res.json({ username: userObject.username, email: userObject.email });
  } else {
    // If email or password incorrect, send 401 status and error message to client
    res.status(401).json({ error: 'Unauthorized: Invalid email or password' });
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