const mongoose = require('mongoose')

// creating the pages schema

const PageSchema = new mongoose.Schema({

    title:{
        type:String,
        required: "Title can't be empty"
    },
    slug:{
        type: String,
    },
    content:{
        type: String,
        required: "Content can't be empty"
    },
    shorting:{
        type: Number
    }
})

const pageModel = mongoose.model('page',PageSchema)

exports.module = pageModel