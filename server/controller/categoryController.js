const multer = require('multer')
const fs = require('fs');
const { validationResult } = require('express-validator')
const catModel = require('../models/categoryModel')


exports.catView = (req,res)=>{
    return res.render('admin/addcategory')
}


exports.catSave = async (req,res)=>{
    const errors = validationResult(req)
    
    if(errors.errors.length>0){
        return res.render('admin/addcategory',{
            errorList: errors.mapped()
        })
    }else{
        
        var slugl = req.body.slug == '' ? req.body.category.replace(/\s+/g, '-').toLowerCase() : req.body.slug.replace(' ', '-').toLowerCase()
        console.log(slugl);
        try {
            
            await catModel.create({
                name:req.body.category,
                icon: req.file.filename,
                slug:slugl
            },(err,dat)=>{
                if (err) {
                    req.flash('danger', 'Sorry, Something occured while creating category')
                    res.render('admin/addcategory', {
                        formData: {
                            category: req.body.category
                        }
                    })
                } else {
                    req.flash('success', 'Category Added')
                    res.render("admin/addcategory")
                }
            })
            
        } catch (error) {
            req.flash('danger', 'Sorry, Something occured while creating category')
            res.render('admin/addcategory', {
                formData: {
                    category: req.body.category
                }
            })
        }

    }
}

exports.catList = async (req,res)=>{
    const catlist = await catModel.find({})
    return res.render('admin/categorylist',{
        categories: catlist
    })
}

exports.catedit = async (req,res)=>{
    const id = req.params.id
    const category = await catModel.findById({_id:id})
    return res.render('admin/editcategory',{category:category})
}

exports.update = async (req,res)=>{
    try {
        const id = req.body.id.trim()
        const data = await catModel.findById({_id:id})
        console.log(data);
        const filepath = 'public/uploads/'+data.icon
        var slugl = req.body.slug == '' ? req.body.category.replace(/\s+/g, '-').toLowerCase() : req.body.slug.replace(' ', '-').toLowerCase()
        
        const cat = await catModel.findByIdAndUpdate(id,{name:req.body.category,icon:req.file.filename,slug:slugl},(err,r)=>{
            if (err) {
                console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
                req.flash('danger', 'Sorry, Something occured while Updating category')
                res.render('admin/editcategorynn/'+id, {
                    formData: {
                        category: req.body.category
                    }
                }) 
            } else {
                fs.unlinkSync(filepath);
                res.redirect('/admin/categorylist')
            }
        })
        
    } catch (error) {
        const id = req.body.id.trim()
        req.flash('danger', 'Sorry, Something occured while Updating categoryxc')
        return res.render('admin/jjjcategory/', {
            formData: {
                category: req.body.category
            }
        })
    }
}

exports.deletecat = async (req,res)=>{
    const id = req.params.id
    try {
        await catModel.findByIdAndDelete(id,(err,asd)=>{
            if (err) {
                req.flash('danger', 'Sorry, Something occured while Deleting category')
                res.render('admin/addcategory')
            } else {
                return res.redirect('/admin/categorylist')
            }
        })
    } catch (error) {
        req.flash('danger', 'Sorry, Something occured while Deleting category')
        res.render('admin/addcategory')
    }
}