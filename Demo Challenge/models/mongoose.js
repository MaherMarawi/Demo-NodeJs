

const mongoose = require('mongoose')
const db = 'mongodb://localhost:27017/?readPreference=primary&articles=MongoDB%20Compass&ssl=false'
mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true })
    .then(() => console.log('DB is connected ...'))
    .catch(err => console.log(err))