const {Schema , model} = require("mongoose");
    const sms = new Schema({
        comment:{
            type:String,
            required:true
        }
    });
    
module.exports = model("Sms" , sms);