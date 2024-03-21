const mongoose = require("mongoose");
const Scheme = mongoose.Schema;
const Users = new Scheme({
    username: { type: String, required: true, unique: true, maxLength: 50 },
    password: { type: String, required: true, maxLength: 50 },
    email: { type: String, unique: true, required: true },
    gender: { type: Boolean, default: false },
    avatar: { type: String },
    age: { type: Number, }
},{
    timestamps:true
});
module.exports=mongoose.model('user',Users) 
 