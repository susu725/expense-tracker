const express = require('express')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//導入routes
require('./config/mongoose')

const app = express()
const PORT = 3000

// 使用routes
app.get('/', (req, res) => {
    res.send(`HI`)
})

app.listen(PORT, () => {
    console.log(`連線成功`)
})