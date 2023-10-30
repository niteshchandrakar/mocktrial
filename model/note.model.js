const mongoose=require("mongoose")
const NoteSchema=mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true}
})

const NoteModel=mongoose.model("user",NoteSchema)

module.exports=NoteModel