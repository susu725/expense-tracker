const express = require('express')
const app = express()
const port = 3000

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
require('./config/mongoose')

app.get('/', (req, res) => {
    res.send(`HI`)
})

app.listen(port, () => {
    console.log(`成功`)
})