const express = require('express');
const ATRoutes = express.Router();
const ATController = require("../../controller/Admin/AnalyticsThreshold.controller");


// Analytics Threshold Routes //
ATRoutes.post("/add-analytics",ATController.AddAnalytics);

// Get Customers 
ATRoutes.get("/get-customers-at",ATController.GetCustomers_AT);

// Update Analytics Threshold Routes //
ATRoutes.put("/update-customers-at/:customer_id",ATController.Update_AT);

// Delete Analytics Threshold Routes //
ATRoutes.put("/delete-customers-at/:customer_id",ATController.Delete_AT);

// Update Analytics Threshold Routes //
ATRoutes.get("/get-analytics-threshold",ATController.GetAnalyticsThreshold);

module.exports = ATRoutes;