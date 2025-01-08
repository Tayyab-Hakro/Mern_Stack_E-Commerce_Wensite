import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: Array,
    required: true,  // assuming it's a URL string to the image
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
  },
  sizes: {
    type: Array,
    required:true  // an array of available sizes (e.g., ['S', 'M', 'L', 'XL'])
  },
  bestseller: {
    type: Boolean,
  },
  date: {
    type: Number,
required:true
  }
});

const Product = mongoose.model('Product', productSchema);

export default  Product;
