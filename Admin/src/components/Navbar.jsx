import React from 'react';

const Navbar = ({SetToken}) => {
  return (
    <nav className="bg-gray-100 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side: Logo */}
        <div className="text-2xl font-semibold text-black">
          <a href="/">MyLogo</a>
        </div>

        {/* Right side: Logout Button */}
        <div>
          <button onClick={() =>SetToken("")} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
