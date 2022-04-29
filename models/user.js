const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        default:"https://res.cloudinary.com/ddlgib7yw/image/upload/v1650797485/24-248253_user-profile-default-image-png-clipart-png-download_nt8cmq.png"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]

    // resetToken:String,
    // expireToken:Date,
    // pic:{
    //  type:String,
    //  default:"https://res.cloudinary.com/cnq/image/upload/v1586197723/noimage_d4ipmd.png"
    // },
    // followers:[{type:ObjectId,ref:"User"}],
    // following:[{type:ObjectId,ref:"User"}]
})

const User = mongoose.model("User",userSchema)
module.exports = User;