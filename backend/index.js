import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv/config'
import MongodbConnection from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import prouductRouter from './routes/prouductRoute.js'
import cartRouter from './routes/cartRouter.js'
import orderRouter from './routes/orderRoute.js'

const app = express()
const Port = process.env.PORT


app.use(express.json())
app.use(cors())


MongodbConnection()
connectCloudinary()

app.use('/api/user' ,userRouter)
app.use('/api/product' ,prouductRouter)
app.use('/api/cart' ,cartRouter)
app.use('/api/order' ,orderRouter)



app.listen(Port , ()=>{
    console.log(`Port is runing on ${Port}`)
})