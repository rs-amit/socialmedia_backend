const router = require('express').Router()
const {Message} = require("../models/Messages")

router.route('/')
.post(async(req,res)=>{
  const addMessages = new Message(req.body)
  console.log(addMessages)
  try{
    saveMessage = await addMessages.save()
    res.status(200).json({saveMessage})
  }catch(err){
    res.status(500).json(err)
  } 
})


router.route('/:conversationId')
.get(async(req,res)=>{
  try{
  const getMessage = await Message.find({conversationId:req.params.conversationId})
  res.status(200).json(getMessage)
  }catch(err){
  res.status(500).json(err)
  }
})


module.exports = router;