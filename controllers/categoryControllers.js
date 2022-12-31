const Category = require("../model/Categories");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ name: req.body.name });
    if (category) {
      return res.status(400).json({ message: "The category already exists" });
    }
    await Category.create({
      ...req.body,
      created_by: req.body.userId,
      updated_by: req.body.userId
    });

    return res.status(200).json({ message: "Category created Successfully" });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Internal Server Error"
    });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("created_by", "firstname email lastname")
      .populate("updated_by", "firstname email"); // null

    if (!categories || !categories.length) {
      return res.status(400).json({ message: "No categories found" });
    }

    return res.status(200).json({
      categories: categories,
      message: "Categories fetched Successfully"
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Internal Server Error"
    });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id)
      .populate("created_by", "firstname email lastname")
      .populate("updated_by", "firstname email"); // null

    if (!category) {
      return res.status(400).json({ message: "No category found" });
    }

    return res.status(200).json({
      category: category,
      message: "Category fetched Successfully"
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Internal Server Error"
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res
        .status(400)
        .json({ message: "Category deletion failed/Invalid category" });
    }

    return res.status(200).json({
      message: "Category Deleted Successfully"
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Internal Server Error"
    });
  }
};


//findByIdAndUpdate(id, {
//   $set: {

//   }
// })
// You need to update the category by id