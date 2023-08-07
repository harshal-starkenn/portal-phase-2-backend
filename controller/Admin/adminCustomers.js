const  User  = require("../../models/Admin/adminCustomers");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { generateJwt } = require("../../auth/JWT");
const storage = require("node-sessionstorage");
var bodyParser = require("body-parser");
var moment = require("moment-timezone");
const Joi = require('joi');

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

const { v4: uuidv4 } = require("uuid");

//============================================{Add- User} [START]======================================================//
exports.Signup = async (req, res) => {
  try {
    const schema = Joi.object({
      first_name: Joi.string().required(),
      last_name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      confirmPassword: Joi.string().valid(Joi.ref('password')).required(), 
      user_type: Joi.string().required(),
      company_name: Joi.string().required(),
      address: Joi.string().required(),
      state: Joi.string().required(),
      city: Joi.string().required(),
      pincode: Joi.string().required(),
      phone: Joi.string().required(),
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
      return res.status(400).json({ message: validation.error.details[0].message });
    }

    const existingCustomerEmail = await User.findOne({ email: req.body.email });
    const existingCustomerPhone = await User.findOne({ phone: req.body.phone });

    if (existingCustomerEmail) {
      return res.status(409).json({ message: "This Email Already Used" });
    } else if (existingCustomerPhone) {
      return res.status(409).json({ message: "This Phone Number Already Used" });
    }

    const hash = await User.hashPassword(req.body.password);
    const id = uuidv4();
    const currentTimeIST = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const newUser = new User({
      userId: id,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hash,
      confirmPassword: hash,
      user_type: req.body.user_type,
      company_name: req.body.company_name,
      address: req.body.address,
      state: req.body.state,
      city: req.body.city,
      pincode: req.body.pincode,
      phone: req.body.phone,
      created_at: currentTimeIST,
      updated_at: currentTimeIST,
    });

    const savedUser = await newUser.save();
    console.log("Customer Created successfully:");
    res.status(200).json({
      code: 200,
      message: "Customer Created Successfully",
      addUser: savedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Failed to Create Customer" });
  }
};
//============================================{ADD- User} [END]========================================================//

//============================================{Admin Login  Start}=====================================================//
exports.Login = async (req, res) => {
  try {
    var { email, password } = req.body;

    //====================1. Find if any account with that email exists in DB=====================//
    var user = await User.findOne({ email: email });
    await User.findOne({ email: email })
      .then((data) => {
       // console.log(data, "okkkk");
      })
      .catch((err) => {
        console.log(err, "errrorrrrr");
      });
    // NOT FOUND - Throw error //
    if (!user) {
      return res.status(402).json({
        statuscode: 402,
        status: "Failed",
        message: "Enter Wrong Email",
        data: {},
      });
    }
    //========================2. Throw error if account is not activated===========================//
    //  if (!user.active) {
    //   return res.status(403).json({
    //     statuscode: 403,
    //     status: "Failed",
    //     message: "You must verify your email to activate your account",
    //     data: {},
    //   });
    // }
    //============================All Fileds Are Mandatory================================// 
    if (!email || !password) {
      return res.status(400).json({
        statuscode: 400,
        status: "Failed",
        message: "Enter All Credentials Mandatory",
        data: {},
      });
    }

    //====================Paswword convert into bcrypt===========================//

    const isValid = await User.comparePasswords(password, user.password);
    console.log("password", password);

    if (!isValid) {
      return res.status(401).json({
        statuscode: 401,
        status: "Unauthorized",
        message: "Invalid  password",
        data: {},
      });
    }

    //=====================Generate JWT Token==========================//
    const { error, token } = await generateJwt(user.email, user.userId);
    user.accessToken = token;
    // const token = jwt.sign({ email: user.email, userId: user.userId }, 'secretKey');
    if (error) {
      return res.status(501).json({
        statuscode: 501,
        status: "Error",
        message: "Couldn't create access token. Please try again later",
        data: {},
      });
    }
    const currentTimeStamp = new Date().getTime();
    await user.save();
    user.accessToken = token;
    // user.userIP = userIP;

    if (user.blockTimeStamp < currentTimeStamp) {
      user.userActivity = true;
      await user.save();
    }

    //storage.setItem("email", user.email);

    return res.status(200).json({
      statuscode: 200,
      status: "OK",
      message: "Customer Logged In Successfully",
      accessToken: token,
      data: {
        active: user.active,
        userId: user.userId,
        email: user.email,
        password: user.password,
        accessToken: user.accessToken,
        user_type: user.user_type,
      },
    });
  } catch (err) {
    console.error("Login error", err);
    return res.status(500).json({
      statuscode: 500,
      status: "Error",
      message: "Couldn't login. Please try again later.",
      data: {},
    });
  }
};
//============================================{Admin Login  END}=======================================================//

//============================================{Admin Logout START======================================================//
exports.Logout = async (req, res) => {
  try {
    const { id } = req.decoded;
    //const { id } = req.decoded;

    let user = await User.findOne({ userId: id });
    console.log(id);

    if (!user) {
      return res.status(404).json({
        statuscode: 404,
        status: "Not Found",
        message: "Customer Not Found",
        data: {},
      });
    }

    user.accessToken = "";

    await user.save();

    return res.status(200).json({
      statuscode: 200,
      status: "OK",
      message: "Customer logged out successfully",
      data: {},
    });
  } catch (error) {
    console.error("user-logout-error", error);
    return res.status(500).json({
      statuscode: 500,
      status: "Error",
      message: error.message,
      data: {},
    });
  }
};
//============================================{Admin Logout END========================================================//

//============================================{Upadte- User} [START]===================================================//
exports.Update = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);

    const {
      first_name,
      last_name,
      email,
      company_name,
      address,
      state,
      city,
      pincode,
      phone,
    } = req.body;


    const existingCustomerEmail1 = await User.findOne({ email: req.body.email });
    const existingCustomerPhone1 = await User.findOne({ phone: req.body.phone });

    if (existingCustomerEmail1) {
      return res.status(409).json({ message: "This Email Already Used" });
    } else if (existingCustomerPhone1) {
      return res.status(409).json({ message: "This Phone Number Already Used" });
    }


//==========================Date and Time============================================//
    var createdAt = new Date();
    var currentTimeIST = moment.tz(createdAt, "Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss a");


    const updatedUser = await User.findOneAndUpdate(
      { userId },
      {
        first_name,
        last_name,
        email,
        company_name,
        address,
        state,
        city,
        pincode,
        phone,
        updated_at: currentTimeIST,
      },

      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ code: 404, message: "Customer Not Found" });
    }

    res
      .status(200)
      .json({ code: 200, message: "Customer Updated Successfully", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Failed to Update Customer" });
  }
};
//============================================{Upadte- User} [END]=====================================================//

//============================================{User-Delete} [START]====================================================//
exports.Delete = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOneAndUpdate(
      { userId: userId },
      { status: false }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
//============================================{User-Delete} [END]======================================================//

//============================================{Get- User} [START]======================================================//
exports.Get = async (req, res) => {
  try {
    const data = await User.find({ status: true }).sort({ created_at: -1 }).exec();
    totalCount = data.length;
    if (totalCount > 0) {
      return res.status(200).json({
        statuscode: 200,
        status: "OK",
        TotalCount: totalCount,
        message: "Customer Get Successfull",
        data,
      });
    }
  } catch (err) {
    console.log(err, "error in Customer Data");
  }
};
//============================================{Get- User} [END]========================================================//

//============================================{Get- User- By Id} [START]===============================================//
exports.GetUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    const data = await User.findOne({ userId: userId });
    return res.status(200).json({
      statuscode: 200,
      status: "OK",
      message: "Customer Get Successfull",
      data,
    });
  } catch (err) {
    console.log(err, "error in Customer Data");
  }
};
//============================================{Get- User- By Id} [END]=================================================//
