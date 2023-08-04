const express = require("express");
const AdminRoutes = express.Router();
const AdminController = require("../../controller/Admin/adminCustomers");
const { validateToken } = require("../../auth/validateToken");
const Admin = require("../../models/Admin/admin.model");


// SignUp user(Insert Data) Routes
AdminRoutes.post("/signup",AdminController.Signup);

// Login User Routes
AdminRoutes.post("/login",AdminController.Login);

// Logout User Routes
AdminRoutes.get("/logout",validateToken,AdminController.Logout);

// Get All User Routes
AdminRoutes.get("/get-all",AdminController.Get);

// Get User By Id Routes
AdminRoutes.get("/get/:userId",AdminController.GetUserById);

// Update User Routes
AdminRoutes.put("/update/:userId",AdminController.Update);

// Delete User Routes
AdminRoutes.put("/delete/:userId",AdminController.Delete);

module.exports = AdminRoutes;