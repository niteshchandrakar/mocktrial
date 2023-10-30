const express=require("express")
const cors=require("cors")
const auth=require("./middleware/auth.middleware")
const UserRouter=require("./routes/user.routes")
const DoctorRouter=require("./routes/doctor.routes")
const connection=require("./config/db")
const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).send({msg:"HomePagee"})
})

app.use("/users",UserRouter)
app.use("/doctors",auth,DoctorRouter)

app.listen(process.env.port,async()=>{
    try{
await connection
console.log("db is running")
    }catch(err){
        console.log(err)
    }
})