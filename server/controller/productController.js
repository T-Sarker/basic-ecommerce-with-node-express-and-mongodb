const mongoose = require('mongoose')
const {
    validationResult
} = require('express-validator')
const fs = require('fs');
const productModel = require('../models/ProductModel')
const catModel = require('../models/categoryModel')
const proModel = require('../models/ProductModel')


exports.create = async (req, res) => {
    const category = await catModel.find({})
    return res.render('admin/addproduct', {
        formData: {
            categories: category
        }
    })
}

exports.save = async (req, res) => {
    console.log(req.body.category);
    const errors = validationResult(req)

    if (errors.errors.length > 0) {
        return res.render('admin/addproduct', {
            errorList: errors.mapped()
        })
    } else {
        if (req.files.length > 0) {
            images = req.files.map((file) => {

                return file.filename
            });
        }
        console.log(images);
        slugL = req.body.name.replace(' ', '-').toLowerCase()
        const category = await catModel.find({})
        try {
            await productModel.create({
                name: req.body.name,
                slug: slugL,
                category: req.body.category,
                color: req.body.colors,
                sizes: req.body.sizes,
                images: images,
                description: req.body.description,
                features: req.body.features,
                quantity: req.body.quantity,
                price: req.body.price,
                oldPrice: req.body.oldPrice != '' ? req.body.oldPrice : " ",
                status: 1,
            }, (err, re) => {
                if (!err) {
                    req.flash('success', 'Product added successfully')

                    return res.render('admin/addproduct', {
                        formData: {
                            categories: category
                        }
                    })
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}

exports.show = async (req, res) => {
    const productList = await productModel.find()

    return res.render('admin/productlist', {
        products: productList
    })
}



exports.edit = async (req, res) => {

    const category = await catModel.find({})
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).render('404')
    }
    try {
        const productS = await proModel.findOne({
            _id: id
        }, (error, r) => {
            if (error) {
                req.flash('danger', 'No product found! ')

                return res.render('admin/editproduct/' + id)
            }
        })
        res.render('admin/editproduct', {
            product: productS,
            formData: {
                categories: category
            }
        })
    } catch (err) {
        req.flash('danger', 'No product found! ')

        return res.render('admin/editproduct/' + id)
    }
}



exports.update = async (req, res) => {

    const errors = validationResult(req)

    if (errors.errors.length > 0) {
        return res.render('admin/addproduct', {
            errorList: errors.mapped()
        })
    } else {
        const id = req.body.id
        var images=''
        if (req.files.length > 0) {
            images = req.files.map((file) => {

                return file.filename
            });
        }
        var fnd = ''

        if (images != '') {
            fnd = await proModel.findById(id)
        }



        console.log(images);
        slugL = req.body.name.replace(' ', '-').toLowerCase()
        const category = await catModel.find({})

        try {
            if (images != '') {
                await productModel.findByIdAndUpdate(id, {
                    name: req.body.name,
                    slug: slugL,
                    category: req.body.category,
                    color: req.body.colors,
                    sizes: req.body.sizes,
                    images: images,
                    description: req.body.description,
                    features: req.body.features,
                    quantity: req.body.quantity,
                    price: req.body.price,
                    oldPrice: req.body.oldPrice != '' ? req.body.oldPrice : " ",
                    status: 1,
                }, (err, re) => {
                    if (!err) {
                        if (fnd != '') {
                            for (let i = 0; i < fnd.images.length; i++) {
                                const imagepath = 'public/uploads/' + fnd.images[i]
                                fs.unlinkSync(imagepath)

                            }
                        }
                        req.flash('success', 'Product Updated successfully')

                        res.redirect('/admin/productlist')
                    }
                })
            } else {
                await productModel.findByIdAndUpdate(id, {
                    name: req.body.name,
                    slug: slugL,
                    category: req.body.category,
                    color: req.body.colors,
                    sizes: req.body.sizes,
                    description: req.body.description,
                    features: req.body.features,
                    quantity: req.body.quantity,
                    price: req.body.price,
                    oldPrice: req.body.oldPrice != '' ? req.body.oldPrice : " ",
                    status: 1,
                }, (err, re) => {
                    if (!err) {

                        req.flash('success', 'Product Updated successfully')

                        res.redirect('/admin/productlist')
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}


exports.delete = async (req,res)=>{
    const id = req.params.id
    const data = await proModel.findById(id) 
    if (data) {
        for (let i = 0; i < data.images.length; i++) {
            const imagepath = 'public/uploads/' + data.images[i]
            fs.unlinkSync(imagepath)
        }
        await proModel.findByIdAndDelete(id,(err,r)=>{
            if (err) {
                req.flash('danger', 'No product found! ')

                return res.render('admin/productlist')
            } else {
                req.flash('success', 'Product Deleted successfully')

                res.redirect('/admin/productlist')
            }
        })
    } else {
        return res.status(400).render('404')
    }
}