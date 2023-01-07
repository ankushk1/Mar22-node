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
    }).populate("category","name")
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
