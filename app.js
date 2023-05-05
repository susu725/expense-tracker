const express = require('express')
const app = express()
const port = 3000

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
require('./config/mongoose')

const exphbs = require('express-handlebars')
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const Record = require('./models/record')

// 首頁
app.get('/', (req, res) => {
    Record.find()
        .lean()
        .sort({ date: 'asc' })
        .then(records => res.render('index', { records }))
        .catch(err => console.log(err))
})

// 新增
app.get('/records/new', (req, res) => {
    res.render('new')
})
app.post('/records', (req, res) => {
    const { name, amount } = req.body
    Record.create({ name, amount })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

// 修改特定資料
app.get('/records/:id/edit', (req, res) => {
    const id = req.params.id
    Record.findById(id)
        .lean()
        .then(record => res.render('edit', { record }))
        .catch(err => console.log(err))
})
app.post('/records/:id', (req, res) => {
    const id = req.params.id
    const { name, amount } = req.body
    Record.findById(id)
        .then(record => {
            record.name = name
            record.amount = amount
            record.save()
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

// 刪除
app.post('/records/:id/delete', (req, res) => {
    const id = req.params.id
    Record.findById(id)
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

app.listen(port, () => {
    console.log(`成功`)
})