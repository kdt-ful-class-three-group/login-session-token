const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//경로
const path = require('path')

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple validation logic
  if (username === '' && password === '') {
    res.json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});