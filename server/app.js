const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    req.session.user = username;
    res.json({ message: 'Login successful', token: 'dummy-token' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logout successful' });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});