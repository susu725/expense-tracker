if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const db = require('../../config/mongoose')

const Category = require('../category')

const categories = [
    {
        id: 1,
        name: '家居物業',
        image: 'https://fontawesome.com/icons/home?style=solid'
    },
    {
        id: 2,
        name: '交通出行',
        image: 'https://fontawesome.com/icons/shuttle-van?style=solid'
    },
    {
        id: 3,
        name: '休閒娛樂',
        image: 'https://fontawesome.com/icons/grin-beam?style=solid'
    },
    {
        id: 4,
        name: '餐飲食品',
        image: 'https://fontawesome.com/icons/utensils?style=solid'
    },
    {
        id: 5,
        name: '其他',
        image: 'https://fontawesome.com/icons/pen?style=solid'
    }
]

db.once('open', () => {
    categories.map(category => {
        Category.create({ ...category })
    })
})