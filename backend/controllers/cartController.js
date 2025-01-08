import User from "../models/userModel.js"


const addToCart = async (req,res) =>{
    try{
        const {userId , itemId, size} = req.body
        const userData = await User.findById(userId)
        let cartData = await userData.cartData
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] +=1
            }else{
                cartData[itemId][size] = 1
            }
            }else{
                cartData[itemId] = {}
                cartData[itemId[size]] = 1
        }
    await User.findByIdAndUpdate(userId,{cartData})
    res.json({success:true ,message:"item is addto cart"})

    }catch(error){
    console.log(error)
    res.json({success:false ,message:"error message from addtocart"})
    }
    }
    
const updateCart = async (req,res) =>{
    try{
        const {userId , itemId, size ,quantity} = req.body
        const userData = await User.findById(userId)
        let cartData = await userData.cartData;
        cartData[itemId][size] = quantity
        await User.findByIdAndUpdate(userId,{cartData})
        res.json({success:true ,message:"item is addto updateCart"})
    
    }catch(error){
        console.log(error)
        res.json({success:false ,message:"error message from updateCart"})
    }
    }

    const getUserCart = async (req,res) =>{
        try{
        const {userId} = req.body
        const userData = await User.findById(userId)
        let cartData = await userData.cartData
        res.json({success:true ,cartData: userData.cartData})

        }catch(error){
            console.log(error)
        res.json({success:false ,message:"error message from getusercart"})
    
        }
    
    }
    export { getUserCart,addToCart , updateCart}