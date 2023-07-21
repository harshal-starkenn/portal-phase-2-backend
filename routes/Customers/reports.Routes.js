const express = require("express");
const ReportsRoutes = express.Router();
const ReportsController = require("../../controller/Customers/Reports.controller");

// Get Driver Reports By Customer ID(trip-Data)
ReportsRoutes.get("/get-all-driverReports/:tripId", ReportsController.generateReport);

//ReportsRoutes.get("/get-all-vehicalReports", ReportsController.getAllVehicalReports);

module.exports = ReportsRoutes;