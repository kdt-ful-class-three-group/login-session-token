const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const app = express();
const PORT = 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true,
  }
));


app.use(session({
  // 세션 암호화에 사용할 비밀 키 (서버에서만 알고 있는 비밀)
  secret: "sessionToken",

  // 클라이언트의 요청이 있어도 세션에 변경사항이 없으면 저장하지 않음
  resave: false,

  // 로그인하지 않은 사용자의 빈 세션도 저장할지 여부 (false면 로그인 후에만 세션 생성)
  saveUninitialized: false,

  cookie: {
    // true면 HTTPS에서만 쿠키 전송 (개발 중엔 false, 운영 시 true 추천)
    secure: false,

    // JavaScript에서 document.cookie로 접근 불가 (보안 강화용)
    httpOnly: true,

    // 쿠키 유효 기간 (밀리초 단위) → 여기선 1시간
    maxAge: 1000 * 60 * 60
  }
}));





// Routes
app.get('/', (req, res) => {
  res.send('Server is running on port 8000');
});

app.get("/api/session",(req,res) => {
  if(req.session.user){
    res.json({
      loggedIn: true,
      user: req.session.user.username
    })
  } else{
    res.status(401).json(
      {
        loggedIn: false,
        msg:"세션이 없습니다."
      }
    )
  }
})



// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  req.session.user = {
    username: username,
    password: password,
  }
  console.log("세션에 저장된 사용자 정보:", req.session.user); // 디버깅용 로그



  // Simple validation logic
  if (username === 'test' && password === 'password') {
    res.json({ message: 'Login successful!' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});