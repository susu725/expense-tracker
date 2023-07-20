const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// 新增
router.get('/create', (req, res) => {
    return res.render('create')
})

router.post('/', (req, res) => {
    const { name, date, category, amount } = req.body
    return Category.findOne({ id: category }).then(categoryId => {
        Record.create({ name, date, categoryId, amount })
        res.redirect('/')
    })
        .catch(err => console.log(err))
})

module.exports = router