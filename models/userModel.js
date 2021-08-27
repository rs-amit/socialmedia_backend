const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
  userName:{
    type:String,
    required:true,
    min:6,
    max:20,
    unique:true
  },
 email:{
   type:String,
   required:true,
   min:15,
   max:30,
   unique:true
 },
 password:{
   type:String,
   required:true,
   max:20,
   unique:true
 },
 profilePicture:{
   type:String,
   default:""
 },
  coverPicture:{
   type:String,
   default:""
 },
 following:{
   type:Array,
   default:[]
 },
  followers:{
   type:Array,
   default:[]
 },
 isAddmin:{
   type:Boolean,
   default:false,
 },
discri:{
  type:String,
  max:50  
},
city:{
  type:String,
  max:50 
},
from:{
  type:String,
  max:50 
},
relation:{
  type:Number,
  enum:[1,2,3]
}
},
{
  timestamps:true
})


const UserModel = mongoose.model("UserModel", userSchema)

module.exports = {UserModel};