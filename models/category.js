const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Category', categorySchema)