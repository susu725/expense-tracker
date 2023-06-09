const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const { formatDate } = require('../../helper/formatDate')

// 新增
router.get('/new', (req, res) => {
    res.render('new')
})
router.post('/', (req, res) => {
    const { name, amount } = req.body
    const userId = req.user._id
    Record.create({ name, amount, userId })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

// 修改特定資料
router.get('/:id/edit', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    Record.findOne({ _id, userId })
        .lean()
        .then(record => {
            record.date = formatDate(record.date)
            res.render('edit', { record })
        })
        .catch(err => console.log(err))
})
router.put('/:id', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    const { name, date, amount } = req.body
    Record.findOne({ _id, userId })
        .then(record => {
            record.name = name
            record.date = date
            record.amount = amount
            record.save()
        })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

// 刪除
router.delete('/:id', (req, res) => {
    const _id = req.params.id
    const userId = req.user._id
    Record.findById({ _id, userId })
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

module.exports = router