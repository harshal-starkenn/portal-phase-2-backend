const express = require('express');
const ATRoutes = express.Router();
const ATController = require("../../controller/Admin/AnalyticsThreshold.controller");


// Analytics Threshold Routes //
ATRoutes.post("/AddAnalytics",ATController.AddAnalytics);

module.exports = ATRoutes;