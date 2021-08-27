const mongoose = require('mongoose')

const postShema = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  disc:{
    type:String,
    max:500
  },
  img:{
    type:String,
    required:true
  },
  likes:{
    type:Array,
    default:[]
  }
},{
  timestamps:true
})

const Post = mongoose.model("Post",postShema);

module.exports={Post}