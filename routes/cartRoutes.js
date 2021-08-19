const express = require('express')
const cartController = require('../server/controller/cartController')

const router = express.Router()


router.post('/addcart',cartController.addCart)

module.exports = router

