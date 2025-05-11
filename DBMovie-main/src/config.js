require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI) 
.then(() => {
    console.log("Database Connected Successfully")
    
})
.catch((error) => {
    console.log(error)
})

//Create Schema
const loginSchema = new mongoose.Schema({
    email:{
        type: String , 
        required : true
    },
    password:{
        type: String,
        required: true
    }
})

//Collection
const collection = new mongoose.model("users",loginSchema)
module.exports = collection