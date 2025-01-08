import { v2 as cloudinary } from 'cloudinary';
import Product from '../models/productModel.js';

const addProduct = async (req, res) => {
    try {
      const { name, description, price, category, subcategory, sizes, bestseller } = req.body;
  
      // Handle file uploads
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];
  
      const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
  
      // Upload images to Cloudinary
      let imagesUrl = await Promise.all(
        images.map(async (item) => {
          try {
            // Adding a retry mechanism in case the request fails due to time mismatch
            const result = await cloudinary.uploader.upload(item.path, {
              resource_type: 'image',
              invalidate: true, // Invalidate cache for the same image URL
            });
            return result.secure_url;
          } catch (uploadError) {
            console.error('Cloudinary upload error:', uploadError.message);
            throw new Error('Error uploading image to Cloudinary');
          }
        })
      );
  
      // Create product data object
      const productData = {
        name,
        description,
        price: Number(price),
        category,
        subcategory,
        sizes: JSON.parse(sizes),
        bestseller: bestseller === "true" ? true : false,
        images: imagesUrl,
        date: Date.now(),
      };
  
      // Save the product to the database
      const product = new Product(productData);
      await product.save();
  
      // Respond with success
      res.status(201).json({
        message: 'Product added successfully',
        product,
      });
    } catch (error) {
      console.error('Error in addProduct:', error);
      res.status(500).json({
        message: 'An error occurred while adding the product',
        error: error.message,
      });
    }
  };

//
const listProduct = async(req , res) =>{
try{
const products = await Product.find({})
res.json({success:true ,products} )
}
catch(error){
  console.log(error)
  res.json({success : false , message:"Error is coming from listprodtc"})
}
}
//
const removeProduct = async(req , res) =>{
try{
await Product.findByIdAndDelete(req.body.id)
res.json({success:true ,message:"Product remove successfully"} )


}catch(error){
  console.log(error)
  res.json({success : false , message:"Error is coming from listprodtc"})

}
 
    
}
//

const singleProduct = async(req , res) =>{
    try{
      const {productId} = req.body
      const products= await Product.findById(productId)
res.json({success:true ,products} )

    }
    catch(error){
      console.log(error)
  res.json({success : false , message:"Error is coming from listprodtc"})

    }
}

export {addProduct,listProduct,removeProduct,singleProduct}