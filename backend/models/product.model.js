import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
  name: {type: String, required: true, max: 100},
  price: {type: Number, required: true}
}, {collection: 'Product'});

export default mongoose.model('Product', ProductSchema);