  const router = require('express').Router();
const {Post} = require("../models/postModel")
const {UserModel}= require('../models/userModel')

router.route('/')
.post(async(req,res)=>{
 try{ 
  const getData = new Post(req.body);
  console.log(getData)
  await getData.save();
  res.status(200).json({"success":true,"message":"post hase been uploaded"})  }catch(err){
   res.json(err)
  }
})
.get(async(req,res)=>{
  try{
    const getData = await Post.find({})
    res.json({"success":true, getData})
  }catch(err){
    res.json({"success":false, getData})    
  }
})


router.route('/:id')
//update
.put(async(req,res)=>{
 try{ const getPostData = await Post.findById(req.params.id)
  if(getPostData.userId === req.body.userId){
    await getPostData.updateOne(req.body)
    res.status(200).json({"success":true,getPostData})
  }else{
    res.status(403).json({"success":true,"message":"you can only update ypur post"})
  }
  }catch(err){
    res.json(err)
  }
})

//delete
.delete(async(req,res)=>{
 try{ const getPostData = await Post.findById(req.params.id)
  if(getPostData.userId === req.body.userId){
    const deleteData = getPostData .deleteOne()
    res.json({"success":true,"deletedData":deleteData})
  }else{
    res.json("you can only delete your post")

  }}catch(err){
    console.log(err)
  }
})

// get a user
.get(async(req,res)=>{
  console.log(req.params.id)
  try{
  const getUser = await Post.find({userId:req.params.id})
  res.json({"success":true,"getUser":getUser})
  }catch(err){
    res.status(500).json(err)
  }
})

//---------------------likes and unlikes--------------------------

router.route("/likes/:id")
.post(async(req,res)=>{
  console.log(req.body.currentUserId)
  try{
  const getPostData = await Post.findById(req.params.id)
  if(!getPostData.likes.includes(req.body.currentUserId)){
    const updateLikes = await Post.findByIdAndUpdate(req.params.id ,{$push:{likes:req.body.currentUserId}},{new:true}) 
    console.log(updateLikes)
    res.status(200).json({"message":"succesfully liked the post","updateLikes":updateLikes})  
  }else{
    const updateLikes = await Post.findByIdAndUpdate(req.params.id ,{$pull:{likes:req.body.currentUserId}},{new:true})
    console.log(updateLikes)
    res.status(200).json({"message":"the post has been unliked","updateLikes":updateLikes})  
  }
  }catch(error){
    res.json({"success":false , error:error.message})    
  }
}) 


 

//------------------timeline-------------------------------

router.route('/timeline/:id')
.get(async(req,res)=>{
 try{ const currentUser = await UserModel.findById(req.params.id)
  const currentUserPost = await Post.find({userId:currentUser._id})
  // console.log(currentUserPost)
  const friendzPost=await Promise.all(
    currentUser.following.map((friendsId)=>{
      return Post.find({userId:friendsId})
    })
  )
  // console.log(friendzPost)
  // console.log(...friendzPost)
  res.json(currentUserPost.concat(...friendzPost))
  }catch(err){
   res.json(err)
  }
})

router.route('/profile/:userName')
.get(async(req,res)=>{
  try{
  const getProfileUser = await UserModel.findOne({userName:req.params.userName})
  const getProfileUserPost = await Post.find({userId:getProfileUser._id})
  res.status(200).json({"success":true,"userAllPost":getProfileUserPost})
  }catch(error){
    res.json({"success":false,error:error.message})
  }

})

module.exports = router;