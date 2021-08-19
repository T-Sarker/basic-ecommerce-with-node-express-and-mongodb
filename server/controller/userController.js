var cookieParser = require('cookie-parser')
const userModel = require('../models/userModel')

const {
    validationResult
} = require('express-validator')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
//creating the functions to perform the login register tasks

exports.register = (req, res) => {
    res.render('front/register')
}

exports.save = async (req, res) => {
    const errors = validationResult(req)
    console.log(errors);
    if (errors.errors.length > 0) {
        return res.render('front/register', {
            errorList: errors.mapped()
        })
    }
    try {
        const hash = bcrypt.hashSync(req.body.password, 10);
        await userModel.create({
            username: req.body.userName,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            password: hash,
        }, (e, d) => {
            if (e) {
                res.render('front/register', {
                    error: "Registration Failed"
                })
            } else {
                req.session
            }
        })
    } catch (error) {
        console.log(error);
    }
}



exports.login = (req, res) => {
    res.render('front/login')
}

exports.loginUser = async (req, res) => {

    try {
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (req.body.userName.match(pattern)==true) {
            var user = await userModel.findOne({email:req.body.userName.trim()})
            console.log(user);
        } else {
            var user = await userModel.findOne({username:req.body.userName.trim()})
            console.log(user);
        }

        if (user!=null) {
            const match = await bcrypt.compare(req.body.password, user.password);

            if (match) {
                var token = jwt.sign({ 
                    userName: user.username,
                    userId:user._id 
                }, 'shhhhh',{ expiresIn: 60000 });
                res.cookie("authToken",token)
                res.redirect('/')
                console.log('Login Success');
            } else {
                console.log('Login Filed');
            }
        }
        
        
    } catch (error) {

    }
}