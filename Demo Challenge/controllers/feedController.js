const Feed = require('../models/feedSchema')
const User = require('../models/userSchema')
const { user } = require('../middlware/authMiddlware')
const home = (req, res) => {
    res.render('welcom', { title: 'Welcom'})
}
const homepage = (req, res) => {
    if (req.method === 'GET') {
        Feed.find()
        .then(result => {
            //res.cookie('hello', true, { httponly: true })
            // if (user.userId) {
            //     console.log(user.userId.id)
            // }
            res.render('index', {title: 'homepage', error:'', data: result, new_action: '/feed', post:''})})
            
        .catch(err => console.log(err))
    } else {
        const feed = new Feed(req.body)
        feed.save()
            .then(() => {
                res.redirect('/feed')})
            .catch(err => {
                Feed.find()
                    .then(result => {res.render('index', {title: 'homepage', error:err.errors, data: result, new_action: '/feed', post:''})})
                    .catch(err => console.log(err))
            })
    }
}
const onepage = (req, res) => {
    Feed.findById(req.params.id)
        .then((result) => {
            // req.url = result.slug
            // console.log(req.url)
            // res.url = result.slug
            // console.log(res.url)
            res.render('one', {title: 'one post', post: result })})
        .catch(err => console.log(err))
}
const delete_post = (req, res) => {
    Feed.findByIdAndDelete(req.params.id)
        .then(() => {res.redirect('/feed')})
        .catch(err => console.log(err))
}

const editpage = (req, res) => {
    if (req.method === 'GET') {
        Feed.findById(req.params.id)
        .then((result) => {res.render('edit', {title: 'edit Post', post: result, new_action: `/feed/edit/${result.id}`, error:''})})
        .catch(err => console.log(err))
    } else {
        Feed.findByIdAndUpdate({_id: req.params.id})
        .then(result => {
            result.name = req.body.name
            result.message = req.body.message
            result.save()
                .then((data) => res.render('one', { title: 'one post', post: data}))
                .catch(err => {
                    Feed.findById(result.id)
                        .then(response => {res.render('edit', {title: 'edit post', error:err.errors, post: response, new_action: `/feed/edit/${result.id}`})})
                        .catch(err => console.log(err))
                })
        })
        .catch(err => console.log(err))
    }
}
module.exports = {
    home,
    homepage,
    onepage,
    delete_post,
    editpage
}