import mongoose from 'mongoose'

const MongodbConnection = async() =>{
  
    mongoose.connection.on("connected", () =>{
        console.log("Mongodb is connected")
    })

    await mongoose.connect(process.env.Mongodb_Url)
   } 


export default MongodbConnection