const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const userdb = require("../model/userModel");
const Model = require("../model/userModel");
require("../connection");
const User = require("../model/userModel");
const SECRET_KEY = "HELLOMYNAMEISANKITGUPTAANDIAMAMERNSTACKDEVELOPER";

// router.get("/", (req, res) => {
//   console.log("Request from userRouter.js");
// });

// email config

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

//Using async-await
router.post("/register", async (req, res) => {
  const { Fname, Lname, email, phone, DOB, gender, password, cpassword } =
    req.body;

  if (!Fname || !Lname || !email || !phone || !password || !cpassword) {
    return res.status(422).json({ message: "Plz filled the field properly" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(409).json({ error: "Email already exist" });
    } else if (password != cpassword) {
      return res
        .status(401)
        .json({ error: "Password is not matching with confirm password !!" });
    } else {
      const user = new User(req.body);
      await user.save();
      res.status(201).json({ message: "User Registered Successfully" });
    }
  } catch (error) {
    console.error(error);
  }
});

//getall
router.get("/getall", (req, res) => {
  Model.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// update
router.put("/update/:userid", (req, res) => {
  Model.findByIdAndUpdate(req.params.userid, req.body)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//login route
router.post("/login", async (req, res) => {
  // res.json({message: "login route working"});

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ error: "Incomplete Credentials" });
    }

    const userLoginData = await User.findOne({ email: email });

    if (userLoginData) {
      const isMatch = await bcrypt.compare(password, userLoginData.password);

      const token = await userLoginData.generateAuthToken();
      // console.log(token);
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 864000000),
        httpOnly: true,
      });
      // console.log(userLoginData);
      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credientials" });
      } else {
        res.status(200).json(userLoginData);
      }
    } else {
      res.status(400).json({ error: "Invaid Credientials" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//send email link for reset password
router.post("/sendpasswordlink", async (req, res) => {
  console.log(req.body);

  const { email } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter Your Email" });
  }
  try {
    const userfind = await userdb.findOne({ email: email });

    //token generate fro reset password
    const token = jwt.sign({ _id: userfind._id }, SECRET_KEY, {
      expiresIn: "120s",
    });

    const setUsertoken = await userdb.findByIdAndUpdate(
      { _id: userfind._id },
      { verifytoken: token },
      { new: true }
    );

    // console.log("setusertoken",setUsertoken)

    if (setUsertoken) {
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Sending Email For Password Reset",
        text: `This Link Valid for 2 MINUTES http://localhost:3000/newpassword/${userfind.id}/${setUsertoken.verifytoken}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("error", error);
          res.status(401).json({ status: 401, message: "email not send" });
        } else {
          console.log("Email sent", info.response);
          res
            .status(201)
            .json({ status: 201, message: "email  send Successfully" });
        }
      });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "invalid user" });
  }
});

router.delete("/delete/:userid", (req, res) => {
  User.findByIdAndDelete(req.params.userid)
    .then((data) => {
      console.log(data);
      res.status(200).json({ message: "User Deleted Successfully" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

//get user by user id
router.get("/getbyid/:userid", (req, res) => {
  User.findById(res.params.userid)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = router;
