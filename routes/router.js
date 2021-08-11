const express = require('express')
const pageModel = require('../server/models/PageModels')
const categoryModel = require('../server/models/categoryModel')
const proModel = require('../server/models/ProductModel')

//**creating the obkect for express Router class */
const router = express.Router()

// example given   router.get('/dataentry', controller.dataentry)

// home route
router.get('/',async (req,res)=>{
    var pageList = await pageModel.find({}).sort({shorting:1})
    var catList = await categoryModel.find({})
    var proList = await proModel.find({}).sort({createdAt:-1})
    res.render('index',{
        pages: pageList,
        categories: catList,
        products: proList
    })
})
// exporting the router to server js file
module.exports = router