import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Orders({ token }) {
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState('');

  const loadOrderData = async () => {
    try {
      if (!token) {
        setError('No token provided.');
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/api/order/list',
        {},
        {
          headers: { token }
        }
      );

      if (response.data.success) {
        setOrderData(response.data.orders);
      } else {
        setError('Failed to fetch orders.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('An error occurred while fetching the orders.');
    }
  };

  const updateOrderStatus = async (orderId, event) => {
    try {
      const newStatus = event.target.value;

      const response = await axios.post(
        'http://localhost:3000/api/order/status',
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        await loadOrderData();
      } else {
        console.error('Failed to update order status.');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="pt-16 container mx-auto px-4">
      <h1 className="text-3xl font-semibold text-center mb-8">Orders</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div>
        {orderData.length > 0 ? (
          orderData.map((order, index) => (
            <div key={index} className="py-6 px-4 mb-6 border rounded-lg shadow-md bg-white">
              {/* Flex container for the order details */}
              <div className="flex flex-wrap justify-between text-gray-800">
                <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
                  <h3 className="font-medium text-lg">Order ID:</h3>
                  <p>{order._id}</p>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
                  <h3 className="font-medium text-lg">Status:</h3>
                  <p className="font-semibold">{order.status}</p>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
                  <h3 className="font-medium text-lg">Total Price:</h3>
                  <p className="font-semibold">${order.totalPrice}</p>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
                  <h3 className="font-medium text-lg">Date:</h3>
                  <p>{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
                  <h3 className="font-medium text-lg">Payment Status:</h3>
                  <p className={order.paymentStatus ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
                    {order.paymentStatus ? 'Paid' : 'Pending'}
                  </p>
                </div>
              </div>

              {/* Flex container for Delivery Information */}
              <h4 className="mt-6 font-semibold text-gray-800">Delivery Information:</h4>
              <div className="flex flex-wrap justify-between text-gray-600">
                <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
                  <p>Name: <span className="font-medium">{order.address.firstName} {order.address.lastName}</span></p>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
                  <p>Email: <span className="font-medium">{order.address.email}</span></p>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
                  <p>Phone: <span className="font-medium">{order.address.phone}</span></p>
                </div>
                <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
                  <p>Address: <span className="font-medium">{order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}, {order.address.country}</span></p>
                </div>
              </div>

              {/* Flex container for items */}
              <h4 className="mt-6 font-semibold text-gray-800">Items:</h4>
              <div className="flex flex-col text-gray-600 ml-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between mb-2">
                    <p className="font-medium">{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                  </div>
                ))}
              </div>

              {/* Status Update Dropdown */}
              <div className="mt-6">
                <label className="block text-gray-700 mb-2">Update Status:</label>
                <select
                  value={order.status}
                  onChange={(event) => updateOrderStatus(order._id, event)}
                  className="p-2 border rounded-md bg-white shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped Out for Delivery">Shipped Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No orders found.</p>
        )}
      </div>
    </div>
  );
}

export default Orders;
