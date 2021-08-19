// const userModel = require('../models/userModel')
var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())
const {
    validationResult
} = require('express-validator')

exports.addCart = async (req, res) => {
        
        if (req.body.cart!=null) {
            let data = req.body.cart.toString()
            if (data!=undefined) {
                if (req.cookies['cartData'] == undefined) {
                    // console.log('if any product is not in cart'+data);
                    await res.cookie("cartData", data, { maxAge: 172800000 }).send(data)
                    console.log(req.cookies["cartData"]);
                } else {
                    console.log('if any product is in cart'+data);
                    res.cookie("cartData", data, { maxAge: 172800000 }).send(data)
                    // console.log(req.cookie["cartData"]);
                }
                console.log(req.cookies['cartData'].split(',').length);
            // return req.body.cart.length
            } else {
                console.log('something wrong');
            }
        } else {
            
        }


}