const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

const { formatDate } = require('../../helper/formatDate')

router.get('/', (req, res) => {
    let totalAmount = 0
    return Record.find()
        .lean()
        .then(records => {
            records.map(record => {
                record.date = formatDate(record.date)
                totalAmount += record.amount
            })
            res.render('index', { records, totalAmount })
        })
        .catch(err => console.log(err))
})

module.exports = router