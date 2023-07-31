const express = require('express');
const ATRoutes = express.Router();
const ATController = require("../../controller/Admin/AnalyticsThreshold.controller");


// Analytics Threshold Routes //
ATRoutes.post("/AddAnalytics",ATController.AddAnalytics);

// Get Customers 
ATRoutes.get("/GetCustomers-AT",ATController.GetCustomers_AT);

// Update Analytics Threshold Routes //
ATRoutes.put("/updateCustomers-AT/:customer_id",ATController.Update_AT);

// Delete Analytics Threshold Routes //
ATRoutes.delete("/deleteCustomers-AT/:customer_id",ATController.Delete_AT);

// Update Analytics Threshold Routes //
ATRoutes.get("/getAnalyticsThreshold",ATController.GetAnalyticsThreshold);

module.exports = ATRoutes;