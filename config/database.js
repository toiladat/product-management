
const mongoose = require("mongoose")
module.exports.connect = ()=>{
  try{
    // connect voi url trong mongo db tu file .env
    mongoose.connect(process.env.MONGO_URL)
    console.log("ket noi database thanh cong")
  }
  catch{
    console.log("ket noi that bai");
  }
}