const express = require('express')
const db = require('./server/database/dbconfig')
const bodyParser = require('body-parser')
const session = require('express-session')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')


//**adding the router file  */

const router = require('./routes/router');
const adminRouter = require('./routes/adminRoutes');
const pageRouter = require('./routes/pagesRoutes');
const userRoute = require('./routes/userRoutes');
const cartRoute = require('./routes/cartRoutes');

const app = express()

// creating some global variables 
app.locals.errorList = null
app.locals.formData =null
app.locals.title =null
app.locals.cart =0

//getting the pages and categories from model and assign the values in local constants
const Pages = require('./server/models/PageModels')
const Categories = require('./server/models/categoryModel')

Pages.find({}).sort({shorting:1}).exec((err,pagesList)=>{
  if (err) {
    console.log(err);
  } else {
    app.locals.pages = pagesList
  }
})

Categories.find({}).exec((err,catList)=>{
  if (err) {
    console.log(err);
  } else {
    app.locals.categories = catList
  }
})


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

app.use(cookieParser())
// app.use(cors({ origin: true, credentials: true }));
//express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true,maxAge: 60000 }
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
app.use('/pages/',pageRouter)
app.use('/user/',userRoute)
app.use('/cart/',cartRoute)

