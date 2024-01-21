const mongoose = require("mongoose")
const loginSchema = new mongoose.Schema({
    name: {
        type:String,
        //required: true
    },
    mobileno: {
        type:String,
        //required: true
    },
    emailid: {
        type:String,
        //required: true
    },
    dob: {
        type:String,
        //required: true
    },
    password: {
        type: String,
        //required: true
    },
    state: {
        type: String,
        //required: true
    },
    district: {
        type: String,
        //required: true
    },
    city: {
        type: String,
        //required: true
    },
    locality: {
        type: String,
        //required: true
    },
    address: {
        type: String,
        //required: true
    }
})

const User = mongoose.model('Users', loginSchema)

module.exports = User