const proModel = require('../models/ProductModel')

exports.show = async (req,res)=>{
    try {
        const cat = req.params.cat
        const productList = await proModel.find({category:cat}).sort({createdAt:-1,price:-1})
        if (productList!='') {
            res.render('front/categoryPage',{
                products: productList
            })
        } else {

            res.render('front/categoryPage',{
                error: "No Product found",
                products:null
            })
        }
    } catch (error) {
        console.log(error);
    }
}