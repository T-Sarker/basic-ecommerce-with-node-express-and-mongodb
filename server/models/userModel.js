const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel