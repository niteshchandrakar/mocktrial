const express=require("express")
const cors=require("cors")
const auth=require("./middleware/auth.middleware")
const connection=require("./db")
const NoteRouter=require("./routes/notes.routes")
const userRouter=require("./routes/users.routes")
require("dotenv").config()
const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.status(200).send({MSG:"HOMEPAGE"})
})
app.use("/users",userRouter)
app.use("/notes",auth,NoteRouter)
app.listen(process.env.port,async()=>{
    try{
    await connection
    console.log("connected to db")
    }catch(error){
        console.log(error)
    }
    })