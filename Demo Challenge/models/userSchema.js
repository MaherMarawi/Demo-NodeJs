

const mongoose = require('mongoose')
const validator = require('validator')
const isEmail = validator.isEmail
// const { isEmail } = require('validator')
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please enter an email'],
    validate: [isEmail, 'Please enter a valid email']
},
    password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'your password is too short']
}
},{timestamps: true})

userSchema.pre('save', async function (next)  {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login =  async function (email, password) {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error('password is incorrect')
    }
    throw Error('email is incorrect')
}

const User = mongoose.model('user', userSchema)

module.exports = User