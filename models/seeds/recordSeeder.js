const Record = require('../record')
const records = require('../data/record.json')

const mongoose = require('mongoose')
const category = require('../category')
mongoose.connect('mongodb+srv://alpha:camp@cluster0.5z75d.mongodb.net/expense-tracker?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection
db.on('error', () => {
    console.log(`連線失敗`)
})
db.once('open', () => {
    console.log(`連線成功`)
    for (let i in records) {
        Record.create({
            name: records[i].name,
            date: records[i].date,
            amount: records[i].amount,
        })
    }
})