const mongoose = require('mongoose')

// creating the pages schema

const PageSchema = new mongoose.Schema({

    title:{
        type:String,
        required: true
    },
    slug:{
        type: String,
    },
    content:{
        type: String,
        required: true
    },
    shorting:{
        type: Number
    }
},{
    timestamps: true
})

const pageModel = mongoose.model('page',PageSchema)

module.exports = pageModel