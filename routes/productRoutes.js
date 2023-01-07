const express = require("express");
const {
  createProduct,
  getProducts
} = require("../controllers/ProductController");
const { validateJWT } = require("../middleware/jwt");
const router = express.Router();

router.post("/create", validateJWT, createProduct);
router.get("/getProducts", validateJWT, getProducts);

module.exports = router;
