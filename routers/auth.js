const router = require('express').Router();
const {UserModel} = require('../models/userModel')

//register
router.route('/Register')
.post(async(req,res)=>{
  try{
    newUser = new UserModel({
      userName:req.body.userName,
      email:req.body.email,
      password:req.body.password
    })
    const user = await newUser.save() 
    res.status(200).json({success:true,message:"user has successfully registered"})

  }catch(error){
    res.json({success:false,error:error.message})
  }
})

//login
router.route("/Login")
.post(async(req,res)=>{
  const {email , password} = req.body;

  console.log(email)
  console.log(password)

  if(!email || !password){
    res.status(400).res({success:false , error:"please enter your email and password"})
  }
  try{
    const getUser = await UserModel.findOne({email})
    if(!getUser){
      res.status(404).json({ success: false, error: "invalid credentials" })
    }
    if(getUser.password.includes(password)){
      res.status(200).json({message:"Successfully Login" , user:getUser})
    }else{
      res.status(404).json({success:false,error:"incorrect password"})
    }
  }catch(error){
    res.status(404).json({success:false,error:error.message})
  }
})

  


module.exports = router;