const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name:{
        type: String,
        required: "Category name can't be empty",
    },
    icon:{
        type: String,
    },
    slug:{
        type: String,
    }
},{
    timestamps: true
})

const catModel = mongoose.model('category',categorySchema)

module.exports = catModel