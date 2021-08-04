//**this is the main controller  */
const {body, validationResult} = require('express-validator')

const pageModel = require('../models/PageModels')


exports.addPage = (req,res)=>{
    return res.render('admin/addpage')    
}

exports.savePage = (req,res)=>{
    
    const errors = validationResult(req)
    // changing the values of the fields to insert in schema
    const title = req.body.title;
    var slug = req.body.slug;
    if(req.body.slug == '') {
        slug = title.replace(' ','-')
    }

    const content = req.body.content;

   
    console.log(errors);
    if(errors){
        return res.render('admin/addpage',{
            errorList: errors,
            title:title,
            slug:slug,
            content:content
        })
    }else{
        console.log(title+"  "+slug+"  "+ content+" ");
    }


}

exports.pageList = (req,res)=>{
    console.log('got it');    
} 