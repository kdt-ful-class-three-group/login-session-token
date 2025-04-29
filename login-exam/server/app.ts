// 모듈 가져오기
import express from 'express'
import path from 'path'

//세션
import session from 'express-session'


const app = express()
// 미들웨어 설정
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//세션 설정
app.use(session({
  secret:'testSecret',
  resave:false,
  saveUninitialized:false
}))

//get / index.html
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'))
})

//form태그 입력
app.post('/login',(req,res)=>{
  //받은 데이터
  const {id, password} = req.body
  console.log('데이터 확인 id:',id,'ps:',password)
})



// 포트설정
app.listen(3010,()=>{
  console.log('server : http://localhost:3010')
})