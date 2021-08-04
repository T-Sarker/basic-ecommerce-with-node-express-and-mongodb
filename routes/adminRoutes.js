const express = require('express')
const {check, validationResult} = require('express-validator')
const pageController = require('../server/controller/pageController')
const upload = require("../server/middlewares/middleware")

//**creating the obkect for express Router class */
const router = express.Router()

// example given   router.get('/dataentry', controller.dataentry)

// admin home route
router.get('/',(req,res)=>{
    
    res.render('admin')
})

router.get('/addpage',pageController.addPage);

router.post('/addpage',[
    check('title')
    .not()
    .isEmpty()
    .withMessage('Title Must be filled'),

    check('content')
    .not()
    .isEmpty()
    .withMessage('Content Must be filled'),

],pageController.savePage)

router.get('/pagelist',pageController.pageList)

// exporting the router to server js file
module.exports = router