// 모듈 가져오기
import express from 'express'
import path from 'path'


const app = express()

//get / index.html
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'index.html'))
})


// 미들웨어 설정
app.use(express.json())

// 포트설정
app.listen(3010,()=>{
  console.log('server : http://localhost:3010')
})