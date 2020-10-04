const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const maxAge = 3 * 24 * 60 * 60

const handelErrors = (err) => {
    //console.log(err.message, err.code)

    let errors = { email: '', password: ''}

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
        return errors
    }
    if (err.code == 11000) {
        errors.email = 'that email is already registerd'
        return errors
    }
    if (err.message == 'email is incorrect') {
        errors.email = 'this email is not registerd'
        return errors
    }
    if (err.message == 'password is incorrect') {
        errors.password = 'password is incorrect'
        return errors
    }
}
const createjwt = function (id) {
    return jwt.sign({ id }, 'secret text of my project', { 
        expiresIn: maxAge
     })
}
const registerPage = async (req, res) =>  {
    if (req.method === "GET") {
        res.render('signup', {title: 'signup'})
    } else {
        try {
            const { email, password } = req.body
            const user = await User.create( { email: email, password: password } )
            const token = createjwt(user._id)
            res.cookie('jwt', token, { httponly: true, maxAge: 1000 * maxAge })
            res.status(200).json({ user })
        } catch (error) {
            const errors = handelErrors(error)
            //console.log(errors)
            res.status(400).json({ errors })
        }
    }
}
const logPage = async (req, res) => {
    if (req.method === 'GET') {
        res.render('login', {title: 'login'})
    } else {
        const { email, password } = req.body
        try {
            const user = await User.login(email, password)
            const token = createjwt(user._id)
            res.cookie('jwt', token, { httponly: true })
            res.status(200).json({ user: user._id })
        } catch (error) {
            const errors = handelErrors(error)
            //console.log(errors)
            res.status(400).json({ errors })
        }
    }
}
const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/login')
}
module.exports = {
    registerPage,
    logPage,
    logout
}


