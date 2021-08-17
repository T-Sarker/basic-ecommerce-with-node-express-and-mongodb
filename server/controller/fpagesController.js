const pageModel = require('../models/PageModels')
const categoryModel = require('../models/categoryModel')
const proModel = require('../models/ProductModel')

exports.fopenPage = async (req, res) => {
    const pageUrl = req.params.slug
    try {
        const pageData = await pageModel.findOne({
            slug: pageUrl
        })
        var pageList = await pageModel.find({}).sort({
            shorting: 1
        })
        var catList = await categoryModel.find({})
        
        res.render('page', {
            page: pageData,
            pages: pageList,
            categories: catList,
            title:pageData.title
        })
    } catch (e) {

    }
}