// const pageModel = require('../models/PageModels')
// const categoryModel = require('../models/categoryModel')
const proModel = require('../models/ProductModel')

exports.home = async (req,res)=>{
    var cartVal =0
    // res.clearCookie('cartData')
    if (req.cookies['cartData']!=undefined) {
        cartVal = req.cookies['cartData'].split(',').length
        var proList = await proModel.find({}).sort({createdAt:-1})
        // var ln = req.headers.cookie.cartData.split(' ')
            
        res.render('index',{
            cart:cartVal,
            formData: proList,
            
        })
    }else{
        var proList = await proModel.find({}).sort({createdAt:-1})
        // var ln = req.headers.cookie.cartData.split(' ')
            
        res.render('index',{
            formData: proList,
            
        })
    }
}