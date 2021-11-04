var express = require('express');
var router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
  "/register",
  [
    check('name').not().isEmpty().withMessage('Name field cannot be empty.'),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 8 })
    .withMessage('Passowrd Password min 8 char'),
    // check("confirmpassword", "Please enter a valid confirm password").isLength({ min: 8 })
    // .withMessage('Passowrd Password min 8 char'),
    // heck('password').isEmpty().matches('confirmpassword2').withMessage('Password dont match.')
    check("idcard", "Please enter a valid idcard").isLength({
      min: 13
    }).withMessage('Must be a valid id card '),
    check("phone", "Please enter a valid phone").optional({ checkFalsy: true }).isInt(),
    check("birthday", "Please enter a valid birthday").isISO8601('yyyy-mm-dd'),
    check("gender", "Please enter a valid gender").not().isEmpty().withMessage('Gender is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { name, email, password, idcard, phone, birthday, gender } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }

      user = new User({
        name,
        email,
        password,
        idcard,
        phone,
        birthday,
        gender
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      // user.idcard = await bcrypt.hash(idcard, salt);
      // user.phone = await bcrypt.hash(phone, salt);
      // user.birthday = await bcrypt.hash(birthday, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 10000
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

router.post(
  "/login",
  [
   check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({ min: 8 })
    .withMessage('Passowrd Password min 8 char')
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({
        email
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        "randomString",
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /user/me
 */

router.get("/me", auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

module.exports = router;
