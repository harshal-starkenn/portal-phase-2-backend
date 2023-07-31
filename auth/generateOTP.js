//--------------------------------------------Generate OTP-------------------------------------------------------------//
// function generateOTP() {
//   var digits = '0123456789abcdefghijklmnopqrstuvwxyz';
//   var otpLength = 6;
//   var otp = '';
//   for (let i = 1; i <= otpLength; i++) {
//     var index = Math.floor(Math.random() * (digits.length));

//     otp = otp + digits[index];
//   }
//   return otp;
// }

//--------------------------------------------Send Mobile OTP----------------------------------------------------------//
// exports.sendMobileOTP = async (req, res) => {
//   try {
//     const email = req.body.email;

//     if (isValidEmail(email)) {
//       res.status(200).json({
//         statuscode: 200,
//         status: 'OK',
//         message: 'Otp Sent Succesfully',
//         data: {}
//       });

//     } else {
//       return res.status(404)
//         .json({
//           statuscode: 404,
//           status: 'Failed',
//           message: 'Invalid Email',
//           data: {}
//         });

//     }
//     const adminData = await Admin.findOne({ email: email });
//     if (adminData.length == 0) {
//       return res.status(404)
//         .json({
//           statuscode: 404,
//           status: 'Failed',
//           message: 'User not found',
//           data: {}
//         });
//     }
//     const kycData = await KycDetails.findOne({ userId: userData.userId })
//     const otp = generateOTP();
//     var options = { authorization: process.env.FAST2SMS, message: `Login OTP: ${otp} valid only for 2 minutes`, numbers: [kycData.phone] }
//     await fast2sms.sendMessage(options)

//     var expiry = new Date().getTime() + 120000;
//     var encryptedOtp = encrypt(otp)
//     await Admin.findOneAndUpdate({ email }, { otp: encryptedOtp, otpExpiry: expiry })
//   } catch (err) {
//     console.log("Error in sendMobileOTP", err);
//     return res.status(500).json({
//       statuscode: 500,
//       status: 'Error',
//       message: err.message,
//       data: {}
//     });
//   }
// }

//--------------------------------------------Send Email OTP----------------------------------------------------------//
// const sendEmailOtp = async (email) => {
//   try {

//     if (!email) {
//       return res.send({
//         statuscode: 400,
//         status: "Failed",
//         message: "Cannot be processed",
//         data: {},
//       });
//     }
//     const admin = await Admin.findOne({ email: email });

//     if (!admin) {
//       return res.send({
//         statuscode: 401,
//         status: "Not Found",
//         message: "User Not Registered",
//         data: {},
//       });
//     }
//     const otp = generateOTP();
//     await sendEmail(admin.email, otp, 3);

//     let expiry = Date.now() + 60 * 1000 * 15;
//     admin.Otp_2fa = otp;
//     admin.Otp_2fa_Expiry = expiry; // 15 minutes
//     await admin.save();

//   } catch (error) {
//     console.error("SendMail-error", error);
//   }
// }
