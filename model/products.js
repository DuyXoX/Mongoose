const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    nameProduct: {
        type: String
    },
    priceProduct: {
        type: String
    },
    descProduct: {
        type: String
    },
    colorProduct: {
        type: String
    }
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;