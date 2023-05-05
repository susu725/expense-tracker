const express = require('express')
const app = express()
const port = 3000

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
    console.log(`連線失敗`)
})
db.once('open', () => {
    console.log(`連線成功`)
})

app.get('/', (req, res) => {
    res.send(`HI`)
})

app.listen(port, () => {
    console.log(`成功`)
})