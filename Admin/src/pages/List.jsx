import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';

function List({ token }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/product/list');
        setProducts(response.data.products); // Adjust based on your API response structure
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.post('http://localhost:3000/api/product/remove', { id: productId }, { headers: { token } });

      if (response.data.success) {
        setProducts(products.filter(product => product._id !== productId));
        toast.success(response.data.message); // Show success toast message
      } else {
        toast.error(response.data.message); // Show error toast message
      }
    } catch (err) {
      toast.error('Failed to delete product'); // Show error toast message
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 border-b">
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Image</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Name</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Category</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Price</th>
              <th className="py-3 px-4 text-left text-gray-600 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="py-3 px-4">
                  <img
                    src={product.images[0]} // Replace with actual image path
                    alt={product.name}
                    className="w-20 h-20 object-cover"
                  />
                </td>
                <td className="py-3 px-4 text-gray-800">{product.name}</td>
                <td className="py-3 px-4 text-gray-600">{product.category}</td>
                <td className="py-3 px-4 text-gray-800 text-xl font-bold">${product.price}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;
