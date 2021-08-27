const router = require('express').Router()
const {Conversation} = require("../models/conversation")

router.route('/')
.post(async(req,res)=>{
  const newConversation = new Conversation({
    members:[req.body.senderId , req.body.receiverId]
  })
  try{
  const conversation = await newConversation.save();
  res.status(200).json({"success":true,conversation})
  }catch(err){
  res.status(500).json({"success":false,err})  
  }
})

router.route('/:userId')
.get(async(req,res)=>{
  try{
  const getConversation = await Conversation.find({members:{$in:[req.params.userId]}})
  res.status(200).json(getConversation)
  }catch(err){
  res.status(500).json(err)  
  }
})
module.exports = router;