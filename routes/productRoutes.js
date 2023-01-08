const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  updateQuantity,
  deactivateProduct
} = require("../controllers/ProductController");
const { validateJWT } = require("../middleware/jwt");
const router = express.Router();

router.post("/create", validateJWT, createProduct);
router.get("/getProducts", validateJWT, getProducts);
router.get("/getProductById/:id", validateJWT, getProductById);
router.delete("/delete/:id", validateJWT, deleteProduct);
router.put("/update/:id", validateJWT, updateProduct);
router.put("/quantityChange/:id", validateJWT, updateQuantity);
router.put("/deactivate/:id", validateJWT, deactivateProduct);

module.exports = router;
