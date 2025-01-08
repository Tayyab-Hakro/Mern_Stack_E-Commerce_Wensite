import React, { useState } from 'react';
import axios from 'axios';
import uploadImage from '../assets/upload_area.png'; // Corrected import
import { toast } from 'react-toastify';

function Add({ token }) {
  // State for handling the uploaded images
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  // State for form data
  const [Name, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [Price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  // State for product link input
  const [productLink, setProductLink] = useState('');

  // Handler for size selection (checkboxes)
  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create FormData object to send data
      const formData = new FormData();
      formData.append('name', Name);
      formData.append('description', Description);
      formData.append('price', Price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes)); // Convert sizes array to JSON

      // Append images if they exist
      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      // Append the product link if it exists
      if (productLink) formData.append('productLink', productLink);

      // Post formData to your API using axios
      const response = await axios.post(
        'http://localhost:3000/api/product/add',
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);

        // Clear form fields
        setName('');
        setDescription('');
        setPrice('');
        setProductLink(''); // Reset product link
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      toast.error(error.response?.data?.message || 'An unexpected error occurred');
    }
  };

  return (
    <>
      <form
        className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-md space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Upload Additional Images */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Additional Images
          </label>
          <div className="flex space-x-4">
            {[image1, image2, image3, image4].map((image, index) => (
              <div key={index} className="flex flex-col items-center">
                <label htmlFor={`image${index + 1}`}>
                  <img
                    className="w-20 h-20 object-cover"
                    src={image ? URL.createObjectURL(image) : uploadImage}
                    alt={`Upload ${index + 1}`}
                  />
                  <input
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (index === 0) setImage1(file);
                      if (index === 1) setImage2(file);
                      if (index === 2) setImage3(file);
                      if (index === 3) setImage4(file);
                    }}
                    type="file"
                    id={`image${index + 1}`}
                    className="hidden"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Description
          </label>
          <textarea
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product description"
          />
        </div>

        {/* Categories (Product Category & Sub Category) */}
        <div className="grid grid-cols-2 gap-4">
          {/* Product Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          {/* Sub Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub Category
            </label>
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
        </div>

        {/* Product Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Price
          </label>
          <input
            type="number"
            value={Price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product price"
          />
        </div>

        {/* Product Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Sizes
          </label>

          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div
              key={size}
              onClick={() => toggleSize(size)}
              className={`p-2 cursor-pointer border ${
                sizes.includes(size) ? 'bg-blue-500 text-white' : 'bg-gray-100'
              }`}
            >
              <p>{size}</p>
            </div>
          ))}
        </div>

        {/* Add to Bestseller */}
        <div className="flex items-center">
          <input
            type="checkbox"
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label className="ml-2 text-gray-700">Add to Bestseller</label>
        </div>

        {/* Product Link Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Link
          </label>
          <input
            type="text"
            value={productLink}
            onChange={(e) => setProductLink(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product link"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </>
  );
}

export default Add;
