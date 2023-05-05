const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
    console.log(`連線失敗`)
})
db.once('open', () => {
    console.log(`連線成功`)
})

module.exports = db