const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const session = require('express-session');

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(
	session({
		secret: '비밀키', // 세션 암호화에 사용되는 키
		resave: false, // 요청이 왔을 때 세션에 변화가 없으면 저장 안 함
		saveUninitialized: false, // 초기화되지 않은 세션 저장 안 함
		cookie: {
			maxAge: 1000 * 60 * 60, // 쿠키 만료 시간 (1시간)
		},
	})
);

// Routes
app.get('/', (req, res) => {
  res.send(fs.readFileSync('index.html', 'utf8'));
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