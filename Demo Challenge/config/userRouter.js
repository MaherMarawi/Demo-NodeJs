const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')
const { notrequireAuth } = require('../middlware/authMiddlware')

router.all('/signup',notrequireAuth, controller.registerPage)
router.all('/login',notrequireAuth, controller.logPage)
router.get('/logout', controller.logout)

module.exports = router