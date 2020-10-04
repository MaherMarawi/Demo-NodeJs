const express = require('express')
const router = express.Router()
const controller = require('../controllers/feedController')
const { requireAuth, checkedUser } = require('../middlware/authMiddlware')

router.get('*', checkedUser)
router.get('/',requireAuth, controller.home)
router.all('/feed',requireAuth, controller.homepage)

router.get('/feed/:id',requireAuth, controller.onepage)
router.get('/remove/:id',requireAuth, controller.delete_post)

router.all('/feed/edit/:id',requireAuth, controller.editpage)

module.exports = router