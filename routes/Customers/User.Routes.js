const express = require("express");
const UserRoutes = express.Router();
const UserController = require("../../controller/Customers/user.controller");


// SignUp user(Insert Data) Routes
UserRoutes.post("/signup",UserController.Signup);

// Login User Routes
UserRoutes.post("/login",UserController.Login);

// Forgot Passwword Routes
UserRoutes.post("/forgot-password",UserController.ForgotPassword)

// Reset Password Routes
UserRoutes.post("/reset-password",UserController.ResetPassword);

// User Activate 
UserRoutes.post("/activate", UserController.Activate);

// Logout User Routes
UserRoutes.post("/logout",UserController.Logout); // Not Working

// Update User Routes
UserRoutes.put("/update-user/:userId",UserController.UpdateUser);

// Delete User Routes
UserRoutes.put("/delete-user/:userId",UserController.DeleteUser);

// Get User Routes
UserRoutes.get("/get-user/:userId",UserController.GetUser);


module.exports = UserRoutes;