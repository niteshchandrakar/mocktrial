const jwt=require("jsonwebtoken")

const auth=async(req,res,next)=>{
   try{
    let token=req.headers.authorization
    
    jwt.verify(token, 'masai', (err, decoded)=> {
       if(decoded){
        req.body.username=decoded.username
        next()
       }else{
        res.status(400).send("not authorized")
       }
      });
   
   }catch(error){
    res.status(400).send({msg:error.message})
   }
}

module.exports=auth