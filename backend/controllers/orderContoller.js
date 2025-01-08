import OrderModel from "../models/orderModel.js";
import Stripe from 'stripe'

const currency = "usd"
const deliveryChargers = 10
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
// Get all orders (admin access)
export const allOrders = async (req, res) => {
try{
const orders = await OrderModel.find({})
res.json({success:true ,orders})

}catch(error){
  console.log(error)
  res.json({success:false , message:"error message"})
}

};
  
  // Update order status (admin access)
  export const updateStatus = async (req, res) => {
    try{
      const {orderId ,status} = req.body
      
          await OrderModel.findByIdAndUpdate(orderId,{status})
          
      res.json({success:true , message:"Status Upadated"})
          }
          catch(error){
              console.log(error)
      res.json({success:false , message:"error message"})
      
          }
  };
  
  // Place a new order
  export const placeOrder = async (req, res) => {
    try{
const {userId , items , amount, address} = req.body
const orderData={
  userId  , items , amount, address,paymentMethd:"COD" ,payment:false,date:Date.now()
    }

    const newOrder = OrderModel(orderData)
    await newOrder.save()
res.json({success:true , message:"Order place sucesullyt"})
    }
    catch(error){
        console.log(error)
res.json({success:false , message:"error message"})

    }
  };
  
  // Place order with Stripe payment
  export const placeOrderStripe = async (req, res) => {
try{
  const {userId , items , amount, address} = req.body
  const { origin }  = req.headers
  const orderData={
    userId  , items , address,amount ,paymentMethd:"stripe" 
    ,payment:false,date:Date.now()
      }

      const newOrder =new OrderModel(orderData)
      await newOrder.save()

      const line_items = items.map((item) =>({
        price_data :{
          currency:currency,
          product_data:{
            name :item.name
          },
          unit_amount : item.price * 100
        },
        quantity : item.quantity
      }))

      line_items.push({
        price_data:{
          currency:currency,
          product_data:{
            name:"Delivery Charges"
          },
          unit_amount : deliveryChargers * 100
        },
        quantity: 1
      })
      const session_url = await stripe.checkout.sessions.create({
        success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
line_items,
mode:"payment"

      })
      res.json({success:true , session_url:session_url})


    } catch(error){
    console.log(error)
      res.json({success:false , message:"error message"})
} };
  
  // Place order with Razorpay payment
  export const placeOrderRazorpay = async (req, res) => {
    // Empty function
  };
  
  // Get orders for a specific user
  export const userOrders = async (req, res) => {
    try{
      const {userId} =req.body
      const orders = await OrderModel.find({userId})
      res.json({success:true,orders})
    }catch(error){
      console.log(error)
      res.json({success:false , message:"error message"})
    }
  };
  