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
		secret: 'adfadlfjalkfjdjasflkjadsjf', // 세션 암호화에 사용되는 키
		resave: false, // 요청이 왔을 때 세션에 변화가 없으면 저장 안 함
		saveUninitialized: false, // 초기화되지 않은 세션 저장 안 함
		cookie: {
      secure: false,
      httpOnly: true,
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
   req.session.user = {
    username: username,
    password: password
   }
   console.log("세션에 저장된 사용자 정보:", req.session.user);

  // Simple validation logic
  if (username === 'id' && password === 'pw') {
    res.json({ message: 'Login successful!', username: username });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get("/api/session",(req,res) => {

      if(req.session.user){
          res.json({
                      loggedIn: true,
                      user: req.session.user.username
                    })
                  
      } else{
            res.status(401).json({
                loggedIn: false,
                msg:"세션이 없습니다."
              })
             }
            })

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});