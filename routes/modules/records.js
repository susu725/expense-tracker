const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

const { formatEditDate } = require('../../helper/formatDate')

// 新增
router.get('/create', (req, res) => {
    return res.render('create')
})

router.post('/', (req, res) => {
    const { name, date, category, amount } = req.body
    return Category.findOne({ id: category }).then(categoryId => {
        Record.create({ name, date, categoryId, amount })
            .then(() => res.redirect('/'))
    })
        .catch(err => console.log(err))
})

// 編輯
router.get('/:id/edit', (req, res) => {
    const _id = req.params.id
    let categoryName = ''
    return Record.findOne({ _id })
        .populate({ path: 'categoryId', select: ['id', 'name'] })
        .lean()
        .then(record => {
            categoryName = record.categoryId.name
            record.date = formatEditDate(record.date)
            record.categoryId = record.categoryId.id
            res.render('edit', { record, categoryName })
        })
        .catch(err => console.log(err))

})

router.put('/:id', (req, res) => {
    const _id = req.params.id
    const info = req.body
    Category.findOne({ id: info.category }).then(categoryId => {
        info.categoryId = categoryId
        return Record.updateOne({ _id }, info)
            .then(() => {
                res.redirect('/')
                console.log(info)
            })
    })
        .catch(err => console.log(err))
})

module.exports = router