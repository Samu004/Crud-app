const mongoose = require('mongoose')

const user = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})

const User = mongoose.model('User',user);

module.exports = User