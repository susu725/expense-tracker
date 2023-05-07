const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const { formatDate } = require('../../helper/formatDate')

// 首頁
router.get('/', (req, res) => {
    let totalAmount = 0
    const userId = req.user._id
    Record.find({ userId })
        .lean()
        .sort({ date: 'asc' })
        .then(records => {
            records.map(function (record) {
                totalAmount += record.amount
            })
            records.map(function (record) {
                return record.date = formatDate(record.date)
            })
            res.render('index', { records, totalAmount })
        })
        .catch(err => console.log(err))
})

module.exports = router