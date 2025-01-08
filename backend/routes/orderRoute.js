import express from 'express';
import {  allOrders,updateStatus ,placeOrder,placeOrderRazorpay,placeOrderStripe,userOrders
} from '../controllers/orderContoller.js';
import authuser from '../middleware/userauth.js';  // Middleware to authenticate user
import adminauth from '../middleware/adminauth.js';

const orderRouter = express.Router();

orderRouter.post('/list', adminauth, allOrders);

orderRouter.post('/status', adminauth, updateStatus);

orderRouter.post('/place', authuser, placeOrder);

orderRouter.post('/stripe', authuser, placeOrderStripe);

orderRouter.post('/razorpay', authuser, placeOrderRazorpay);

orderRouter.post('/userorders', authuser, userOrders);

export default orderRouter;
