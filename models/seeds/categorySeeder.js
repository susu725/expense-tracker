if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const db = require('../../config/mongoose')

const Category = require('../category')

const categories = [
    {
        id: 1,
        name: '家居物業',
        image: 'fa-solid fa-house'
    },
    {
        id: 2,
        name: '交通出行',
        image: 'fa-solid fa-van-shuttle'
    },
    {
        id: 3,
        name: '休閒娛樂',
        image: 'fa-solid fa-face-grin-beam'
    },
    {
        id: 4,
        name: '餐飲食品',
        image: 'fa-solid fa-utensils'
    },
    {
        id: 5,
        name: '其他',
        image: 'fa-solid fa-pen'
    }
]

db.once('open', () => {
    Category.create(categories)
        .then(() => process.exit())
        .catch(err => console.log(err))
})