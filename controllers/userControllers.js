const { db } = require("../model/User");
const User = require("../model/User");
const bcrypt = require('bcrypt');
const saltrounds = 10;

//Creating controller/func to signup user
exports.signup = async (req, res) => {
  try {
    // If user already signedup
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists/Try Signin" });
    }

    const encryptedPass = bcrypt.hashSync(req.body.password, saltrounds)
    //Creating User
    const userCreated = await User.create({...req.body, password : encryptedPass});
    return res.status(200).json({ message: "User created Successfully" });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Internal Server Error"
    });
  }
};

// module.exports  = {
//   signup : () => {

//   },
//   signin : () => {

//   }
// }

// const signup = () => {

// }

// export const signin = () => {

// }

// module.exports = {
//   signup,
//   signin
// }
