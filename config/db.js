const mongoose = require('mongoose');
const uri='mongodb+srv://khanhsnph43678:khanhsnph43678@cluster0.s2dwghm.mongodb.net/MyDatabase';
const connect = async()=>{
    try {
        await mongoose.connect(uri)
        console.log('Connect Success');
    } catch (error) {
        console.log(error)
        console.log('Connect Fail')
    }
}
module.exports={connect}