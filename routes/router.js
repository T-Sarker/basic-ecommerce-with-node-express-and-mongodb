const express = require('express')

//**creating the obkect for express Router class */
const router = express.Router()

// example given   router.get('/dataentry', controller.dataentry)

// home route
router.get('/',(req,res)=>{
    
    res.render('index')
})
// exporting the router to server js file
module.exports = router