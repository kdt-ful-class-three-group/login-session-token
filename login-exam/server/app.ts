// 모듈 가져오기
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


// 미들웨어 설정
app.use(express.json())

// 포트설정
app.listen(3010,()=>{
  console.log('server : http://localhost:3010')
})