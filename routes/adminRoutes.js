const express = require('express')
const {check} = require('express-validator')
const pageController = require('../server/controller/pageController')
const catController = require('../server/controller/categoryController')
const upload = require("../server/middlewares/multer")

//**creating the obkect for express Router class */
const router = express.Router()

// example given   router.get('/dataentry', controller.dataentry)

// admin home route
router.get('/',(req,res)=>{
    
    res.render('admin')
})

router.get('/addpage',pageController.addPage);

router.post('/addpage',[
    check('title')
    .not()
    .isEmpty()
    .withMessage('Title Must be filled'),

    check('content')
    .not()
    .isEmpty()
    .withMessage('Content Must be filled'),

],pageController.savePage)

// post request for update the sorted results in db
router.post('/reorder-page',pageController.pageOrder)

// routes for the editing page
router.get('/editpage/:id',pageController.editPage)

router.post('/editpage/',[
    check('title')
    .not()
    .isEmpty()
    .withMessage('Title Must be filled'),

    check('content')
    .not()
    .isEmpty()
    .withMessage('Content Must be filled'),
],pageController.updatePage)
// this route will delete a data
router.get('/delete/:id',pageController.deletePage)



router.get('/pagelist',pageController.pageList)

//** ....................admin category routes................................... */

router.get('/addcategory',catController.catView)


router.post('/addcategory',[ upload.single('image'),
    check('category')
    .not()
    .isEmpty()
    .withMessage('Name Must be filled'),    
],catController.catSave)


router.get('/categorylist',catController.catList)

router.get('/editcategory/:id',catController.catedit)

router.post('/editcategory',[
    upload.single('image'),
    check('category')
    .not()
    .isEmpty()
    .withMessage("Name must not be empty!")
],catController.update)

router.get('/deletecat/:id',catController.deletecat)
// exporting the router to server js file
module.exports = router