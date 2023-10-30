const express=require("express")

const NoteRouter=express.Router()

NoteRouter.get("/",async(req,res)=>{
    
    res.status(200).send("Notes")
})
module.exports=NoteRouter