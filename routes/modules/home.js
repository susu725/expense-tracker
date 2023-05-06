const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const { formatDate } = require('../../helper/formatDate')

// 首頁
router.get('/', (req, res) => {
    Record.find()
        .lean()
        .sort({ date: 'asc' })
        .then(records => {
            records.map(function (record, i) {
                return records[i].date = formatDate(record.date)
            })
            res.render('index', { records })
        })
        .catch(err => console.log(err))
})

module.exports = router