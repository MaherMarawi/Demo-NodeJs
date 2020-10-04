const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'secret text of my project', (err, decodedtoken) => {
            if (err) {
                res.redirect('/login')
            } else {
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}
const notrequireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'secret text of my project', (err, decodedtoken) => {
            if (err) {
                next()
            } else {
                res.redirect('/feed')
            }
        })
    } else {
        next()
    }
}
const checkedUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'secret text of my project', async (err, decodedtoken) => {
            if (err) {
                res.locals.user = null
                next()
            } else {
                const user = await User.findById(decodedtoken.id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = null
        next()
    }
}
module.exports = { 
    requireAuth,
    checkedUser,
    notrequireAuth
}