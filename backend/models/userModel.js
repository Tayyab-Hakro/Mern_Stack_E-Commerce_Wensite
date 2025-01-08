import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // ensures each email is unique
  },
  password: {
    type: String,
    required: true,
  },
  cartData: {
    type: Object,  // assuming this will be an object that holds the user's car data
    default:{}
},
  
},{minimize : false});

const User = mongoose.model('User', userSchema);
export default  User;
