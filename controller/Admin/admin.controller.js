const Admin = require("../../models/Admin/admin.model");
const express = require('express');
const app = express();
const { generateJwtAdmin } = require("../../auth/JWT");
const cookieParser = require("cookie-parser");
var bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());

const { v4: uuidv4 } = require('uuid');


//======================={Admin Signup START}======================//
exports.Signup = async (req, res) => {
  try {
    const {first_name, last_name, user_type, email, password, status } = req.body;

    // Hash the password
    const hashedPassword = await Admin.hashPassword(password, 10);

    // Generate a new unique UUID
    const userId = uuidv4();

    const newAdmin = new Admin({
      userId,
      first_name,
      last_name,
      email,
      password: hashedPassword, 
      user_type,
      status,
    });

    const savedAdmin = await newAdmin.save();
    console.log('Admin saved successfully:', savedAdmin);
    res.status(200).json({ code: 200, message: 'Admin Added Successfully', addAdmin: savedAdmin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: 'Failed to add Admin' });
  }
};
//======================={Admin Signup END}=======================// 

//======================={Admin Login  Start}====================//
exports.Login = async (req, res) => {
  try {
    var { email, password } = req.body;

    var admin = await Admin.findOne({ email: email });

    if (!admin) {
      return res.status(402).json({
        statuscode: 402,
        status: 'Not Found',
        message: 'Account Not Found',
        data: {},
      });
    }

    const isValid = await Admin.comparePasswords(password, admin.password);
    console.log("password", password);
    if (!isValid) {
      return res.status(401).json({
        statuscode: 401,
        status: 'Unauthorized',
        message: 'Invalid credentials',
        data: {},
      });
    }

//=====================Generate JWT Token==========================//
    const { error,token } = await generateJwtAdmin(admin.email, admin.userId);
    admin.accessToken = token;

    if (error) {
      return res.status(501).json({
        statuscode: 501,
        status: "Error",
        message: "Couldn't create access token. Please try again later",
        data: {},
      });
    }

    const currentTimeStamp = new Date().getTime();
    await admin.save();
    admin.accessToken = token;
   // user.userIP = userIP;
  
    if (admin.blockTimeStamp < currentTimeStamp) {
      admin.userActivity = true
      await admin.save();
    }

    return res.status(200).json({ 
      statuscode: 200,
      status: 'OK',
      message: 'Admin Logged In Successfully',
      accessToken: token,
      data: {
        userId: admin.userId,
        email: admin.email,
        first_name: admin.first_name,
        last_name: admin.last_name,
        accessToken: admin.accessToken
      },
    });
  } catch (err) {
    console.error('Login error', err);
    return res.status(500).json({
      statuscode: 500,
      status: 'Error',
      message: "Couldn't login. Please try again later.",
      data: {},
    });
  }
};
//======================={Admin Login  END}======================//

//======================={Admin Logout START=====================//

exports.Logout = async (req, res) => {
  try {
    const { userId } = req.body;

    const admin = await Admin.findOneAndUpdate({userId:userId} );

    if (!admin) {
      return res.status(404).json({
        statuscode: 404,
        status: "Not Found",
        message: "Admin not found",
        data: {},
      });
    }

    admin.accessToken = "";

    await admin.save();

    return res.status(200).json({
      statuscode: 200,
      status: "OK",
      message: "Admin logged out successfully",
      data: {},
    });
  } catch (error) {
    console.error("Admin-logout-error", error);
    return res.status(500).json({
      statuscode: 500,
      status: "Error",
      message: error.message,
      data: {},
    });
  }
};

//======================={Admin Logout END=======================//


