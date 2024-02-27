const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    userId : 
    {
       type : Number,
       required : true,
       unique : true
    },
    name : 
    {
       type : String,
      // required : true
    },
    city : 
    {
       type : String,
      //required : true
    },
    country : 
    {
       type : String,
       //required : true
    },
    blocked :
    {
        type : Boolean,
        default :false
    },
    admin :
    {
      type : Boolean,
      default : false
    },
    isDeleted :
    {
      type : Boolean,
      default : false
    }
})

module.exports = mongoose.model('User', userSchema)