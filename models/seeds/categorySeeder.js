const Category = require('../category')
const categories = require('../data/category.json')

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://alpha:camp@cluster0.5z75d.mongodb.net/expense-tracker?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

const db = mongoose.connection
db.on('error', () => {
    console.log(`連線失敗`)
})
db.once('open', () => {
    console.log(`連線成功`)
    for (let i in categories) {
        Category.create({
            name: categories[i].name,
            icon: categories[i].icon
        })
    }

})