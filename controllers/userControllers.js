const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltrounds = 10;
const jwt = require("jsonwebtoken");

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

    const encryptedPass = bcrypt.hashSync(req.body.password, saltrounds);
    //Creating User
    const userCreated = await User.create({
      ...req.body,
      password: encryptedPass
    });
    return res.status(200).json({ message: "User created Successfully" });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Internal Server Error"
    });
  }
};

exports.signin = async (req, res) => {
  try {
    // Trying to signin, we will get email and pass in body
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(400)
        .json({ message: "User doesn't exist/ Signup first" });
    }

    //Check the passwords are matching (req.body.pass, db passwords)
    const isPassCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isPassCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const { _id, firstname, email } = user;

    const token = jwt.sign({_id, firstname, email}, "secret", {
      expiresIn:"12h"
    })

    return res.status(200).json({token:token, userRole: user.role,  message: "Signin Success" });
  } catch (err) {
    return res.status(500).json({
      error: err,
      message: "Internal Server Error"
    });
  }
};
