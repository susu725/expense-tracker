const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

// 新增
router.get('/new', (req, res) => {
    res.render('new')
})
router.post('/', (req, res) => {
    const { name, amount } = req.body
    Record.create({ name, amount })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

// 修改特定資料
router.get('/:id/edit', (req, res) => {
    const id = req.params.id
    Record.findById(id)
        .lean()
        .then(record => res.render('edit', { record }))
        .catch(err => console.log(err))
})
router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Record.findById(id)
        .then(record => record.remove())
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

module.exports = router