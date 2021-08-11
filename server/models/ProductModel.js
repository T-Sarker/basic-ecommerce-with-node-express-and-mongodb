const {
    text
} = require('body-parser')
const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    color: {
        type: String
    },
    sizes: {
        type: String,

    },
    images: [{
        type: String
    }],
    description: {
        type: String,
        trim: true,
        required:true
    },
    features: {
        type: String,
        trim: true,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    oldPrice:{
        type:Number,
    },
    status: {
        type: Number
    }
},{
    timestamps:true
})

const proModel = mongoose.model('product',productSchema)

module.exports = proModel