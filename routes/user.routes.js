const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const userModel=require("../model/user.model")
const UserRouter=express.Router()

UserRouter.get("/",async(req,res)=>{
    const newuser= await userModel.find()
    res.status(200).json({msg:newuser})
})

UserRouter.post("/register",async(req,res)=>{
    try{
   const {email,password}=req.body
   bcrypt.hash(password, 5, async(err, hash)=> {
    const newuser= new userModel({email:email,password:hash})
await newuser.save()
});

res.status(200).json({msg:"Registraion Successfull"})
    }catch(error){
        res.status(400).json({msg:error.message})
    }
})


UserRouter.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body
        const user= await userModel.findOne({email})
        if(user){
       const token=     jwt.sign({  email: user.email }, 'masai');
       bcrypt.compare(password, user.password, async(err, result)=> {
       
        if(result){
            res.status(200).json({msg:"Login SuccessFull","token":token})
        }else{
            res.status(400).json({msg:"Wrong Password"})
        }
    });
          
        }else{
            res.status(400).json({msg:"Register First"})
        }
    }catch(error){
        res.status(400).json({msg:error.message})
    }
})


module.exports=UserRouter