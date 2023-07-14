const express = require("express");
const AdminRoutes = express.Router();

const AdminController = require("../../controller/Admin/admin.controller");

// Admin Sign-up Routes
AdminRoutes.post("/signup",AdminController.Signup);

//Admin  Login Routes
AdminRoutes.post("/login",AdminController.Login);

//Admin Logout Routes
AdminRoutes.put("/logout/:userId",AdminController.Logout); // Not Working (Check Bug's reports)


module.exports = AdminRoutes;