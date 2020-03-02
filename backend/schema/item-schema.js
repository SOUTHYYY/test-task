
const mongoose = require('mongoose')

const ItemSchema = mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    gps: {
        type: [Number, Number],
        require: true,
    },
    country: {
        type: String,
        require: true
    },
    timezone: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model('Item', ItemSchema)
