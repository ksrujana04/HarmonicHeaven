const mongoose = require("mongoose")
const discussionSchema = new mongoose.Schema({
    message:{
        type: String
    }
})

const Discussion = mongoose.model('Discussions', discussionSchema)

module.exports = Discussion