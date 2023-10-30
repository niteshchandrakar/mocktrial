const express=require("express")
const UserModel=require("../model/user.model")
const userRouter=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
userRouter.get("/",async(req,res)=>{
    const users= await UserModel.find()
    res.status(200).send(users)
})

userRouter.post("/register",async(req,res)=>{
    try{
    const {username,password}=req.body
    const user =await UserModel.findOne({username:username})
    if(user){
        res.status(400).send({msg:"USER ALREADY REGISTERS"})
    }else{
        bcrypt.hash(password, 5, async(err, hash)=> {
            const newuser=new UserModel({username,password:hash})
            await newuser.save()
            res.status(200).send({MSG:"REGISTER SUCCEFULL"})
        });
    }
    }catch(error){
        res.status(400).send({msg:error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    try{
const {username,password}=req.body
const user= await UserModel.findOne({username})
if(user){
  const token=  jwt.sign({
        username:username
      }, 'masai', { expiresIn: '1h' });
    bcrypt.compare(password, user.password, async(err, result)=> {
        // result == false

        if(result){
        res.status(200).send({msg:"LOGIN SUCCESS",token:token})
        }else{
            res.status(400).send({msg:"invalid password"})
        }
    });
}else{
    res.status(400).send({msg:"USER NOT FOUND"}) 
}


    }catch(error){
        res.status(400).send({msg:error.message})
    }
})

module.exports=userRouter