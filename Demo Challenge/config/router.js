const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

router.get('/', controller.home)
router.get('/feed', controller.homepage)
router.post('/feed', controller.homepage)

router.get('/feed/:id', controller.onepage)
router.get('/remove/:id', controller.delete_post)

router.get('/feed/edit/:id', controller.editpage)
router.post('/feed/update/:id', controller.put_post)


module.exports = router