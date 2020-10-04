

const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const feedSchema = new Schema({
    name: {
    type: String,
    required: [true, 'Please enter a name'],
    minlength: 1,
    maxlength: [15, "it's too long"]
},
    message: {
    type: String,
    required: [true, 'Please enter a message'],
    minlength: 1,
    maxlength: 40
}
},{timestamps: true})

// feedSchema.pre('save', function (next)  {
//     const slug = this.name.split(' ').join('-')
//     this.slug = slug;
//     next()
// })

const Feed = mongoose.model('Feed', feedSchema)

module.exports = Feed