const Product = require("../model/Product");

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ name: req.body.name });
    if (product) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const productCreated = await Product.create({
      ...req.body,
      description: JSON.stringify(req.body.description),
      created_by: req.body.userId,
      updated_by: req.body.userId
    });

    if (!productCreated) {
      return res.status(400).json({ message: "Product creation failed" });
    }
    return res.status(200).json({ message: "Product created Successfully" });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Internal Server Error"
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      $and: [{ isActive: true }, { quantity: { $gt: 0 } }]
    })
      .populate("category", "name")
      .populate("created_by", "firstname email");

    if (!products || !products.length) {
      return res.status(400).json({ message: "No products found" });
    }

    return res.status(200).json({ products: products });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Internal Server Error"
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findById(id)
      .populate("category", "name")
      .populate("created_by", "firstname email");
    if (!product) {
      return res.status(400).json({ message: "Product doesn't exist" });
    }

    const { _id, name, description, price, category } = product;
    return res.status(200).json({ _id, name, description, price, category });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Internal Server Error"
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(400)
        .json({ message: "Product deletion failed/Invalid Product" });
    }

    return res.status(200).json({
      message: "Product Deleted Successfully"
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Internal Server Error"
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      $set: { ...req.body, updated_by: req.body.userId }
    });

    if (!updatedProduct) {
      return res
        .status(400)
        .json({ message: "Product updation failed/Invalid Product" });
    }

    return res.status(200).json({ message: "Product Updated Successfully" });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Internal Server Error"
    });
  }
};


exports.updateQuantity = async (req, res) => {
  try{
    const id = req.params.id;
    const product = await Product.findById(id)

    if(product.quantity < req.body.quantity){
      return res.status(400).json({message:`You cannot buy quantity of this product exceeding ${product.quantity} units`})
    }

    const updatedQuantity = await Product.findByIdAndUpdate(id, {
      $inc : { quantity : -req.body.quantity},
      $set : { updated_by: req.body.userId }
    });

    if (!updatedQuantity ) {
      return res
        .status(400)
        .json({ message: "Quantity updation failed/Invalid Product" });
    }

    return res.status(200).json({ message: "Quantity Updated Successfully" });
  }catch (err) {
    return res.status(500).json({
      error: err,
      message: "Internal Server Error"
    });
  }
}


exports.deactivateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deactivatedProduct = await Product.findByIdAndUpdate(id, {
      $set: { isActive: false, updated_by: req.body.userId }
    });

    if (!deactivatedProduct) {
      return res
        .status(400)
        .json({ message: "Product deactivation failed/Invalid Product" });
    }

    return res.status(200).json({ message: "Product Deactivated Successfully" });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Internal Server Error"
    });
  }
};