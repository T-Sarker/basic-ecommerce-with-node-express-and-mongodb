const express = require('express')
const homeController = require('../server/controller/fhomeController')

const fcatController = require('../server/controller/fcategoryController')

const filterproduct = require('../server/controller/filterController')

//**creating the obkect for express Router class */
const router = express.Router()

// example given   router.get('/dataentry', controller.dataentry)

// home route
router.get('/',homeController.home)

// showing category wise products
router.get('/category/:cat', fcatController.show)

//ajax call routes for filter results
//all filter with products
router.post('/filter/sizes',filterproduct.allFilter)

//404 redirection route
router.get('/404',(req,res)=>{
    res.render('404')
})

// exporting the router to server js file
module.exports = router

