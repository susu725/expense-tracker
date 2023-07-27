if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const db = require('../../config/mongoose')

const User = require('../user')
const Category = require('../category')
const Record = require('../record')

const bcrypt = require('bcryptjs')

const users = [
    {
        name: '廣志',
        email: 'user1@example.com',
        password: '12345678'
    },
    {
        name: '小新',
        email: 'user2@example.com',
        password: '12345678'
    }
]

const records = [
    {
        name: '午餐',
        date: '2019/04/23',
        amount: 60,
        categoryId: 4,
        userId: 1
    },
    {
        name: '晚餐',
        date: '2019/04/23',
        amount: 60,
        categoryId: 4,
        userId: 1
    },
    {
        name: '捷運',
        date: '2019/04/23',
        amount: 120,
        categoryId: 2,
        userId: 1
    },
    {
        name: '電影：驚奇隊長',
        date: '2019/04/23',
        amount: 220,
        categoryId: 3,
        userId: 2
    },
    {
        name: '租金',
        date: '2015/04/01',
        amount: 25000,
        categoryId: 1,
        userId: 1
    }
]

db.once('open', () => {
    Promise.all(users.map((user, index) => {
        return User.create({
            ...user,
            password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
        })
            .then(user => {
                return Promise.all(records.map(record => {
                    if (index + 1 === record.userId) {
                        return Category.findOne({ id: record.categoryId }).then(category => {
                            return Record.create({
                                ...record,
                                categoryId: category._id,
                                userId: user._id
                            })
                        })
                    }
                }))
            })
    }))
        .then(() => process.exit())
        .catch(err => console.log(err))
})