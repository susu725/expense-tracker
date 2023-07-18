if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const db = require('../../config/mongoose')

const Record = require('../record')

const records = [
    {
        name: '午餐',
        date: '2019/04/23',
        amount: 60
    },
    {
        name: '晚餐',
        date: '2019/04/23',
        amount: 60
    },
    {
        name: '捷運',
        date: '2019/04/23',
        amount: 120
    },
    {
        name: '電影：驚奇隊長',
        date: '2019/04/23',
        amount: 220
    },
    {
        name: '租金',
        date: '2015/04/01',
        amount: 60
    }
]

db.once('open', () => {
    records.map(record => {
        Record.create({ ...record })
    })
})