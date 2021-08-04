const express = require('express')
const db = require('./server/database/dbconfig')
const bodyParser = require('body-parser')
const session = require('express-session')
const expressValidator = require('express-validator')


//**adding the router file  */

const router = require('./routes/router')
const adminRouter = require('./routes/adminRoutes')

const app = express()

// creating some global variables 
app.locals.errorList = null
app.locals.formData =null

//**other dafinations for to work on express */

app.use(express.urlencoded({extended:true}))

// static file setting
app.use(express.static("public")) 

//setup view engine
app.set('view engine','ejs')


///**creating a server for node js with a port 3000  */
app.listen(3000,()=>{
    console.log('server is running');
})


//**now calling the database function for connection */
db()

//**Creating the middleware requirements */
// bodyParser middleware 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

//express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});



// routing 
app.use('/',router)
app.use('/admin/',adminRouter)

app.get('/',async (req,res)=>{
    const allBlog = await blog.find()
    res.render('index',{'blogs':allBlog})
})