import {v2 as cloudinary} from 'cloudinary'
import dotenv from 'dotenv/config'

const connectCloudinary = async() =>{
    cloudinary.config({
        cloud_name : process.env.ClOUDINARY_NAME,
        api_key :process.env.ClOUDINARY_API_KEY,
        api_secret : process.env.ClOUDINARY_SECRECT_KEY
    })


}


export default connectCloudinary