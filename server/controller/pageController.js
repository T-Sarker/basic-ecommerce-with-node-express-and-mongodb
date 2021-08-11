//**this is the main controller  */
const {
    validationResult
} = require('express-validator')
const mongoose = require('mongoose')
const pageModel = require('../models/PageModels')


exports.addPage = (req, res) => {
    return res.render('admin/addpage')
}

exports.savePage = async (req, res) => {

    const errors = validationResult(req)

    if (errors.errors.length > 0) {
        console.log(errors.mapped());
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
        const check = await pageModel.findOne({
            slug: slugl
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
            } else {
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
    return res.render('admin/pagelist', {
        pages: pageList
    })
}

exports.pageOrder = async (req, res) => {
    const ids = req.body.id
    console.log(ids);
    // var count =0;
    console.log(ids.length);
    for (let i = 0; i < ids.length; i++) {
        var id = ids[i].replace('.', '')
        console.log(id);
        short = i + 1;
        console.log(short);
        try {
            await pageModel.findByIdAndUpdate(id, {
                shorting: short
            }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('success');
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

exports.editPage = async (req, res) => {
    const id = req.params.id
    const data = await pageModel.findById({
        _id: id
    })
    return res.render('admin/editPage', {
        formdata: data
    })
}

exports.updatePage = async (req, res) => {

    const id = req.body.id

    const errors = validationResult(req)

    if (errors.errors.length > 0) {
        req.flash('danger', 'Sorry, Data Insertion failed')
        return res.redirect('/admin/editpage/' + id)

    } else {
        var slugl = req.body.slug == '' ? req.body.title.replace(/\s+/g, '-').toLowerCase() : req.body.slug.replace(' ', '-').toLowerCase()


        const data = await pageModel.findByIdAndUpdate(id, {
            title: req.body.title,
            slug: slugl,
            content: req.body.content
        }, (err, s) => {
            if (err) {
                req.flash('danger', 'Sorry, Data Insertion failed')
                res.render('admin/editpage' + id, {
                    formdata: {
                        title: req.body.title,
                        slug: req.body.slug,
                        content: req.body.content
                    }
                })
            } else {

                res.redirect('/admin/pagelist')

            }
        })
    }
}

exports.deletePage = async (req, res) => {
    const id = req.params.id

    try {
        await pageModel.findByIdAndDelete(id, (err) => {
            if (err) {
                req.flash('danger', 'Sorry something went wrong!')
                console.log(err, pagex);
            } else {
                return res.redirect('/admin/pagelist')
            }
        })
    } catch (error) {

    }

}