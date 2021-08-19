const express = require('express')
const {check} = require('express-validator')
const userController = require('../server/controller/userController');
const mdl = require('../server/middlewares/validationMiddleware')

const router = express.Router()

//creating the routes for user login and registration
// register routes
router.get('/register',userController.register);
router.post('/register',[
    check('userName')
    .not()
    .isEmpty()
    .withMessage('Name can\'t be empty'),
    check('address')
    .not()
    .isEmpty()
    .withMessage('Address can\'t be empty'),
    check('phone')
    .not()
    .isEmpty()
    .withMessage('Phone can\'t be empty')
    .isLength({ min: 11,max:11 })
    .withMessage('Phone no Must be 11 charecter long'),
    check('email')
    .not()
    .isEmpty()
    .withMessage('Email can\'t be empty')
    .isEmail()
    .withMessage('Value is not an Email'),
    check('password')
    .not()
    .isEmpty()
    .withMessage('Password can\'t be empty')
],userController.save);

router.get('/login',userController.login);
router.post('/login',userController.loginUser);

// router.get('/logout',userController.logout);


module.exports = router