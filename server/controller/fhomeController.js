// const pageModel = require('../models/PageModels')
// const categoryModel = require('../models/categoryModel')
const proModel = require('../models/ProductModel')

exports.home = async (req,res)=>{
    
    
    var proList = await proModel.find({}).sort({createdAt:-1})

    
    res.render('index',{
        // pages: pageList,
        // categories: catList,
        products: proList
    })
}