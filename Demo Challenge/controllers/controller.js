const Feed = require('../models/feedSchema')

const home = (req, res) => {
    res.redirect('/feed')
}
const homepage = (req, res) => {
    if (req.method === 'GET') {
        Feed.find()
        .then(result => {res.render('index', {title: 'homepage', error:'', data: result, new_action: '/feed', post:''})})
        .catch(err => console.log(err))
    } else {
        const feed = new Feed(req.body)
        feed.save()
            .then(() => {
                console.log(feed)
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
        .then((result) => {res.render('one', {title: 'one post', post: result})})
        .catch(err => console.log(err))
}
const delete_post = (req, res) => {
    Feed.findByIdAndDelete(req.params.id)
        .then((result) => {res.redirect('/feed')})
        .catch(err => console.log(err))
}

const editpage = (req, res) => {
    Feed.findById(req.params.id)
        .then((result) => {res.render('edit', {title: 'edit Post', post: result, new_action: `/feed/update/${result.id}`, error:''})})
        .catch(err => console.log(err))
    
}
const put_post = (req, res) => {
    // Feed.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false })
    //     .then( (result) => {res.redirect('/')})
    //     .catch( err => console.log(err))
    Feed.findByIdAndUpdate({_id: req.params.id})
        .then(result => {
            result.name = req.body.name
            result.message = req.body.message
            result.save()
                .then((data) => res.render('one', { title: 'one post', post: data}))
                .catch(err => {
                    Feed.findById(result.id)
                        .then(response => {res.render('edit', {title: 'edit post', error:err.errors, post: response, new_action: `/feed/update/${result.id}`})})
                        .catch(err => console.log(err))
                    
                })
                
        })
        .catch(err => console.log(err))
}


module.exports = {
    home,
    homepage,
    onepage,

    delete_post,

    editpage,
    put_post
}