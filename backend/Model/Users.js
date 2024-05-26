const mongoose=require('mongoose')
const {Schema}=mongoose;
const UserSchema=new Schema({
    fname:{
        type: String,
        required: true,
    },
    lname:{
        type: String,
        required: false,
        default: ""
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        default:"Intern"
    }
})
module.exports=mongoose.model('Users', UserSchema)