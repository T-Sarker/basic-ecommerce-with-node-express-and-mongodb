//**this is the main controller  */
const {validationResult} = require('express-validator')

const pageModel = require('../models/PageModels')


exports.addPage = (req, res) => {
    return res.render('admin/addpage')
}

exports.savePage = async (req, res) => {

    const errors = validationResult(req)

    if (errors.errors.length > 0) {
        console.log( errors.mapped());
        return res.render('admin/addpage', {
            errorList: errors.mapped(),
            formData: {
                title: req.body.title,
                slug: req.body.slug,
                content: req.body.content
            }
        })
    } else {
        
        var slugl = req.body.slug == '' ? req.body.title.replace(/\s+/g, '-').toLowerCase() : req.body.slug.replace(' ', '-').toLowerCase()
        const check = await pageModel.findOne({ slug:slugl
        }, (err, page) => {
            if (page) {
                req.flash('danger', 'Sorry, This slug already exists')
                res.render('admin/addpage', {
                    formData: {
                        title: req.body.title,
                        slug: req.body.slug,
                        content: req.body.content
                    }
                })
            }else{
                pageModel.create({
                    title: req.body.title,
                    slug: slugl,
                    content: req.body.content,
                    shorting: 0,
                }, (err) => {
                    if (err) {
                        req.flash('danger', 'Sorry, Data Insertion failed')
                        res.render('admin/addpage', {
                            formData: {
                                title: title,
                                slug: slug,
                                content: content
                            }
                        })
                    } else {
                        req.flash('success', 'Page Added')
                        res.render("admin/addpage")
                    }
                });
            }
            
        })
        

    }



}

exports.pageList = async (req, res) => {
    const pageList = await pageModel.find()
    // console.log(pageList);
    return res.render('admin/pagelist',{
        pages : pageList
    })
}