  const router = require('express').Router() 
// const {UserModel} = require('../models/UserModel')
const {UserModel} = require('../models/userModel')

//-------------------------RUD operation ------------------------
// read all user
router.route('/users')
.get(async(req,res)=>{
  const getAllData = await UserModel.find({})
  res.json(getAllData)
})

//read a users
router.route("/")
.get(async(req,res)=>{
  const userId = req.query.userId;
  const userName = req.query.userName;
  try{
   const getUser = userId 
   ? await UserModel.findById(userId)
   : await UserModel.findOne({userName:userName})
   res.status(200).json(getUser)
  }catch(err){
    res.send(err)
  }
})


//upadate
router.route('/:id')
.post(async(req,res)=>{
  try{

    if(req.params.id === req.body.userId){
    const userDataUpdate = await UserModel.findByIdAndUpdate( req.params.id ,{$set : req.body})
    // console.log(userDataUpdate)
    res.json({"success":true,userDataUpdate })
  }else{
    res.send("u can only update your account")
  }
  }catch(err){
    res.send(err)
  }

})

// delete
.delete(async(req,res)=>{
  try{
    if(req.params.id == req.body.userId){    
      const deletedUser = await UserModel.deleteOne(req.params.id)
      res.send("Account has been deleted")   
    }else{
      res.send("you can only delete you account")
    }
  }catch(err){
    res.send(err)
  }
})

.get(async(req,res)=>{
  try{
   console.log(req.params.id)
   const getUser = await UserModel.findById(req.params.id)
   res.status(200).json({"success":true,getUser})
  }catch(err){
    res.send(err)
  }
})

// -------------------------following--------------------------

router.route("/:id/follow")
.put(async(req,res)=>{
  if(req.params.id !== req.body.userId){     
    const user = await UserModel.findById(req.params.id)
    const currentUser = await UserModel.findById(req.body.userId)
    if(!user.followers.includes(req.body.userId)){
        await user.updateOne({$push:{followers:req.body.userId}})
        await currentUser.updateOne({$push:{following:req.params.id}})
        res.json("user has been followed")
    }else{
        res.json("you are already following this account")
    }
  }else{
    res.json("you can not follow yourself")
  }
}
)


//--------------------------------unfollow--------------------------

router.route('/:id/unfollow')
.put(async(req,res)=>{
  console.log()
  if(req.params.id!==req.body.userId){
    const user = await UserModel.findById(req.params.id)
    const currentUser = await UserModel.findById(req.body.userId)
    if(user.followers.includes(req.body.userId)){
      await user.updateOne({$pull :{followers:req.body.userId}})
      await currentUser.updateOne({$pull :{following:req.params.id}})
      res.json("user has been umfollowed")
    }else{
      res.json("you are already not following this user ")       
    }
  }else{
    res.json("you can not follow this user")    
  }
})


router.route('/friends/:userId')
.get(async(req,res)=>{
  try{ const user = await UserModel.findById(req.params.userId)
  console.log(user)
  const friends = await Promise.all(
    user.following.map((friendId)=> UserModel.findById(friendId))
  )
  const friendsList = [];
  friends.map((frnd)=>{
    const {_id ,profilePicture ,userName } = frnd;
    friendsList.push({_id ,profilePicture ,userName})
  })
  res.status(200).json({"success":true,"friendsList":friendsList})
  }catch(error){
    res.json({"success":false,error:error.message})
  }

})


router.route('/followersFriends/:userId')
.get(async(req,res)=>{
  try{ const user = await UserModel.findById(req.params.userId)
  console.log(user)
  const friends = await Promise.all(
    user.followers.map((friendId)=> UserModel.findById(friendId))
  )
  const friendsList = [];
  friends.map((frnd)=>{
    const {_id ,profilePicture ,userName } = frnd;
    friendsList.push({_id ,profilePicture ,userName})
  })
  res.status(200).json({"success":true,"friendsList":friendsList})
  }catch(error){
    res.json({"success":false,error:error.message})
  }

})


module.exports = router;