

const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const feedRouter = require('./config/feedRouter')
const userRouter = require('./config/userRouter')


// Connect to DB

require('./models/mongoose')

// Middelware

app.use(express.static('public'))
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cookieParser())
app.use(feedRouter)
app.use(userRouter)

// View engine

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));




app.listen(8000)

