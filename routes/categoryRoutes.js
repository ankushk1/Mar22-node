const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
  deactivateCategory
} = require("../controllers/categoryControllers");
const { validateJWT } = require("../middleware/jwt");
const router = express.Router();

router.post("/create", validateJWT, createCategory);
router.get("/getCategories", validateJWT, getCategories);
router.get("/getCategoryById/:id", validateJWT, getCategoryById);
router.delete("/delete/:id", validateJWT, deleteCategory);
router.put("/update/:id", validateJWT, updateCategory);
router.put("/deactivate/:id", validateJWT, deactivateCategory);

module.exports = router;
