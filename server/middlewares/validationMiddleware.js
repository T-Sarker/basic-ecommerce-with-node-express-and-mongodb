const jwt = require('jsonwebtoken')

exports.checkLogin = (req,res,next) => {
    const token = req.cookies.authToken
    console.log("jhgljluyfk "+token);
    if (token==undefined) {
        res.redirect('/user/login')
    } else {
        const decoded = jwt.verify(token, 'shhhhh');
        
    }
    next()
}