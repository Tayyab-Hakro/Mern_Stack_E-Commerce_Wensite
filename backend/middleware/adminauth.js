import jwt from 'jsonwebtoken'


const adminauth = async(req,res,next)=>{
    try{
        const {token} = req.headers
        if(!token){
            return res.json({success:false , message:"Not authorizes login admin"})
        }
        const token_decode = jwt.verify(token,process.env.SECRET_TOKEN);
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false , message:"Not authorizes login admin"})

        }
        next()
    }catch(error){
console.log(error)
        return res.json({success:false , message:"error message"})
    }
}

export default adminauth