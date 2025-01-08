import User from "../models/userModel.js"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_TOKEN, { expiresIn: '3d' }); // Token valid for 3 days
  }
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if all fields are provided
      if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
      }
  
      // Check if the user exists by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: "User does not exist." });
      }
  
      // Check if the password is correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ success: false, message: "Incorrect password." });
      }
  
      // Create a token if authentication is successful
      const token = createToken(user._id);
  
      // Return success response with token
      res.status(200).json({ success: true, token, message: "Login successful!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error, please try again later." });
    }
  };
  


const registerUser = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      // Check if all fields are provided
      if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
      }
  
      // Check if the email already exists
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(400).json({ success: false, message: "User already exists." });
      }
  
      // Validate email
      if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Invalid email address." });
      }
  
      // Validate password length
      if (password.length < 8) {
        return res.status(400).json({ success: false, message: "Password must be at least 8 characters long." });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      // Save the user to the database
      const user = await newUser.save();
  
      // Create a token
      const token = createToken(user._id);
  
      // Return success response with token
      res.status(201).json({ success: true, token, message: "User registered successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error, please try again later." });
    }
  };

const admingLogin = async (req , res) =>{
  try{
    const {email , password} = req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password,process.env.SECRET_TOKEN);
      res.json({success:true, token})
    }
  }catch(error){
    console.error(error);
    res.status(500).json({ success: false, message: "Server error, please try again later." });
  }
  }


export {loginUser ,registerUser, admingLogin}