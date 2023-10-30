const express=require("express")
const DoctorModel=require("../model/doctor.model")

const DoctorRouter=express.Router()

DoctorRouter.get("/",async(req,res)=>{
    const {name,specialization}=req.query
    if(name){
        const doctors= await DoctorModel.find({name:name})
        res.status(200).send({msg:doctors})
    }else if(specialization){
        const doctors= await DoctorModel.find({specialization:specialization})
        res.status(200).send({msg:doctors})
    }else{
        const doctors= await DoctorModel.find()
        res.status(200).send({msg:doctors})
    }
    
})

DoctorRouter.post("/add",async(req,res)=>{
    try{
   const { name, image, specialization, location, date, experience, slots,fee}=req.body
const newdoctor= new DoctorModel({name, image, specialization, location, date, experience, slots,fee})
await newdoctor.save()
res.status(200).send({msg:"Doctor Added"})
    }catch(error){
        res.status(400).send({msg:error.message})
    }
})

DoctorRouter.delete("/delete/:_id",async(req,res)=>{
    try{
   const {_id}=req.params
 await DoctorModel.findByIdAndDelete({_id})
 res.status(200).send({msg:"Doctor Deleted"})

    }catch(error){
        res.status(400).send({msg:error.message})
    }
})
DoctorRouter.patch("/update/:_id",async(req,res)=>{
    try{
   const {_id}=req.params
   const payload=req.body
 await DoctorModel.findByIdAndUpdate({_id:_id},payload)
 res.status(200).send({msg:"Doctor updated"})

    }catch(error){
        res.status(400).send({msg:error.message})
    }
})



module.exports=DoctorRouter