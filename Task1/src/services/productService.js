import Product from "../models/product";

let findBySku = async (product_sku) => {
  if (parseInt(product_sku)) {
    const data = await Product.where({ sku: parseInt(product_sku) }).findOne();

    if (data) {
      return { status: true, value: data };
    } else {
      return {
        status: false,
        value: "Sorry, Product not found! Try again with different SKU.",
      };
    }
  } else {
    return {
      status: false,
      value: "Sorry, Product SKU is required! Try again.",
    };
  }
};

module.exports = {
  findBySku: findBySku,
};
