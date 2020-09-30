

const express = require('express')
const app = express()
const path = require('path')
app.use(express.static('public'))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extends: true}))
require('./models/mongoose')
const router = require('./config/router')

app.use(router)

app.listen(8000)

