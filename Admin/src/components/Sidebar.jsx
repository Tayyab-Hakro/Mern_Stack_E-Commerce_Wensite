import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaList, FaShoppingCart } from 'react-icons/fa'; // Importing icons from react-icons

const Sidebar = () => {
  return (
    <div className="bg-gray-100 mt-2 h-screen p-4 shadow-md" style={{ width: '18%' }}>
      {/* Sidebar content */}
      <div className="flex flex-col space-y-8">
        {/* Add Items Button */}
        <Link to="/add" className="flex items-center space-x-3 text-black hover:text-blue-500 transition duration-300">
          <FaPlusCircle size={24} />
          <span className="text-lg font-semibold">Add Items</span>
        </Link>

        {/* List Items Button */}
        <Link to="/list" className="flex items-center space-x-3 text-black hover:text-blue-500 transition duration-300">
          <FaList size={24} />
          <span className="text-lg font-semibold">List Items</span>
        </Link>

        {/* Orders Button */}
        <Link to="/orders" className="flex items-center space-x-3 text-black hover:text-blue-500 transition duration-300">
          <FaShoppingCart size={24} />
          <span className="text-lg font-semibold">Orders</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
