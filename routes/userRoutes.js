const express = require("express");
const { signup, signin } = require("../controllers/userControllers");
const { validateJWT } = require("../middleware/jwt");

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)


module.exports = router;