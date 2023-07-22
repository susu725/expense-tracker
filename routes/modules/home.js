const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

const { formatHomeDate } = require('../../helper/formatDate')

router.get('/', (req, res) => {
    let totalAmount = 0
    return Record.find()
        .populate({ path: 'categoryId', select: 'image' })
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
            records.map(record => {
                record.date = formatHomeDate(record.date)
                totalAmount += record.amount
                record.categoryId = record.categoryId.image
            })
            res.render('index', { records, totalAmount })
        })
        .catch(err => console.log(err))
})

module.exports = router