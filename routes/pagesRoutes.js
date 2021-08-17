const express = require('express')
const pagesController = require('../server/controller/fpagesController')

const router = express.Router()


router.get('/:slug',pagesController.fopenPage)

module.exports = router