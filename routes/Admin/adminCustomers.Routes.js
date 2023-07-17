const express = require("express");
const AdminRoutes = express.Router();
const AdminController = require("../../controller/Admin/adminCustomers");
const { validateToken } = require("../../auth/validateToken");


// SignUp user(Insert Data) Routes
AdminRoutes.post("/Signup",AdminController.Signup);

// Login User Routes
AdminRoutes.post("/Login",AdminController.Login);

// Logout User Routes
AdminRoutes.get("/Logout",validateToken,AdminController.Logout);

// Get User Routes
AdminRoutes.get("/Get",AdminController.Get);

// Update User Routes
AdminRoutes.put("/update/:userId",AdminController.Update);

// Delete User Routes
AdminRoutes.delete("/delete/:userId",AdminController.Delete);

module.exports = AdminRoutes;