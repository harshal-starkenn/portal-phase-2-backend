const  User  = require("../../models/Admin/adminCustomers");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { generateJwt } = require("../../auth/JWT");
const storage = require("node-sessionstorage");
var bodyParser = require("body-parser");
var moment = require("moment-timezone");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

const { v4: uuidv4 } = require("uuid");

//============={Email=Validation}===============//
function isValidateEmail(Vemail) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(Vemail).toLowerCase());
}



//============================================{Add- User} [START]======================================================//
exports.Signup = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      confirmPassword,
      user_type,
    } = req.body;
    const { company_name, address, state, city, pincode, phone } = req.body;

    //--------------------Check Existing Email---------------------//
    const existingCustomerEmail = await User.findOne({ email });
    //--------------------Check Existing User Name-----------------//
    //const existingCustomerUserName = await User.findOne({  username });
    //--------------------Check Existing Phone---------------------//
    const existingCustomerPhone = await User.findOne({ phone });

    if (!isValidateEmail(email)) {
      return res.status(401).send({
        statuscode: 401,
        status: "Failed",
        message: "Email Is Invalid",
        data: {},
      });
    }

    if (existingCustomerEmail) {
      return res.status(500).send("This Email Already Taken ");
    } else if (existingCustomerPhone) {
      return res.status(500).send("This Phone Number Already Taken");
    }

    //---------------------Check filed's required---START-----------------------------------------//
    if (!first_name) {
      return res.status(400).json({ message: "FIRST_NAME is required" });
    } else if (!last_name) {
      return res.status(400).json({ message: "LAST_NAME is required" });
    } else if (!email) {
      return res.status(400).json({ message: "EMAIL is required" });
    } else if (!phone) {
      return res.status(400).json({ message: "PHONE Numberis required" });
    } else if (!password) {
      return res.status(400).json({ message: "PASSWORD is required" });
    } else if (!confirmPassword) {
      return res.status(400).json({ message: "CONFIRM_PASSWORD is required" });
    } else if (!user_type) {
      return res.status(400).json({ message: "USER TYPE is required" });
    } else if (!company_name) {
      return res.status(400).json({ message: "COMPANY_NAME is required" });
    } else if (!address) {
      return res.status(400).json({ message: "ADDRESS is required" });
    } else if (!state) {
      return res.status(400).json({ message: "STATE is required" });
    } else if (!city) {
      return res.status(400).json({ message: "CITY is required" });
    } else if (!pincode) {
      return res.status(400).json({ message: "PINCODE is required" });
    } else if (!phone) {
      return res.status(400).json({ message: "PHONE is required" });
    }
    //-----------------------------------Check filed's required---END----------------------------------------------------//

    //-----------------------------------Check if password and confirm password match-----------------------------------//


    if (password != confirmPassword) {
      return res.status(402).json({
        statuscode: 402,
        status: "Failed",
        message: "Passwords MisMatched",
        data: {},
      });
    }

    var user = await User.findOne({ email: email });

    if (user) {
      return res.status(404).json({
        statuscode: 404,
        status: "Failed",
        message: "Email Is Already In Use",
        data: {},
      });
    }

    //-----------------------------------Hash the password And Confirm Password-------------------------------//
    var hash = await User.hashPassword(password);
    //-----------------------------------Generate a new unique UUID------------------------------------------//
    const id = uuidv4();

//---------------------------------------Date & Time--------------------------------------------------------//
    var createdAt = new Date();
    var currentTimeIST = moment.tz(createdAt, "Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss a");

    let code = Math.floor(100000 + Math.random() * 900000);

    let expiry = Date.now() + 60 * 1000 * 120; //120 mins in ms

    //const sendCode = await sendEmail(email, code, 1);

    console.log("code", code);

    const newUser = new User({
      userId: id,
      first_name,
      last_name,
      email,
      password: hash,
      confirmPassword: hash,
      user_type,
      company_name,
      address,
      state,
      city,
      pincode,
      phone,

      created_at: currentTimeIST,
      updated_at: currentTimeIST,
    });

    const savedUser = await newUser.save();
    console.log("User saved successfully:", savedUser);
    res.status(200).json({
      code: 200,
      message: "User Added Successfully",
      addUser: savedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Failed to add User" });
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
        console.log(data, "okkkk");
      })
      .catch((err) => {
        console.log(err, "errrorrrrr");
      });
    // NOT FOUND - Throw error //
    if (!user) {
      return res.status(402).json({
        statuscode: 402,
        status: "Not Found",
        message: "Wrong Email",
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
      message: "User Logged In Successfully",
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
        message: "User not found",
        data: {},
      });
    }

    user.accessToken = "";

    await user.save();

    return res.status(200).json({
      statuscode: 200,
      status: "OK",
      message: "User logged out successfully",
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
    var createdAt = new Date();
    var currentTimeIST = moment
      .tz(createdAt, "Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss a");
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
      return res.status(404).json({ code: 404, message: "User not found" });
    }

    res
      .status(200)
      .json({ code: 200, message: "User updated successfully", updatedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: "Failed to update User" });
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
        message: "User Get Successfull",
        data,
      });
    }
  } catch (err) {
    console.log(err, "error in Vehicle Data");
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
      message: "User Get Successfull",
      data,
    });
  } catch (err) {
    console.log(err, "error in Vehicle Data");
  }
};
//============================================{Get- User- By Id} [END]=================================================//
