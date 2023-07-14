const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/Admin/adminCustomers");

async function validateToken(req, res, next) {
  try {

    const authorizationHeader = req.headers.authorization;
    let result;

    if (!authorizationHeader)

      return res.status(400).json({
        statuscode: 400,
        status: "Failed",
        message: "Access token is missing",
        data:{}
      });

    const token = req.headers.authorization.split(" ")[1]; // Bearer <token>

    const options = {
      expiresIn: "1h",
    };

    // var unix = Math.round(+new Date()/1000);
    let user = await User.findOne({ accessToken: token });

    if (!user) {

      return res.status(402).json({
        statuscode: 402,
        status: "Not Found",
        message: "Access Token Not Exist",
        data: {}
      });

    }
    result = jwt.verify(token, process.env.JWT_SECRET, options);

    if (!user.userId === result.id) {

      return res.status(401).json({
        statuscode: 401,
        status: "Failed",
        message: "Invalid Token",
        data: {}
      });

    }

    req.decoded = result;  // append the result in the "decoded" field of req

    next();
  } catch (err) {
    console.error(err);
    if (err.name === "TokenExpiredError") {

      return res.status(403).json({
        statuscode: 403,
        status: "Failed",
        message: "Token Expired",
        data: {}
      });

    } else {

      return res.status(404).json({
        statuscode: 404,
        status: "Failed",
        message: "Authentication error",
        data: {err : err.message}
      });
    }
  }
}
module.exports = { validateToken };