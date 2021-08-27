const mongoose = require("mongoose")

const conversation = mongoose.Schema({
  members:{
    type:Array
  }
},
{timestamps:true}
)

const Conversation = mongoose.model("Conversation",conversation)

module.exports={Conversation}