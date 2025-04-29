// 모듈 가져오기
import express from 'express'
import path from 'path'


const app = express()


// 미들웨어 설정
app.use(express.json())

// 포트설정
app.listen(3010,()=>{
  console.log('server : http://localhost:3010')
})