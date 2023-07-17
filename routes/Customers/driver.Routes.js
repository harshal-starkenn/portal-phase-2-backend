const express = require("express");
const DriverRoutes = express.Router();
const DriverController = require("../../controller/Customers/Drivers.controller");

// Get All Driver List
DriverRoutes.get("/get-all-drivers", DriverController.getAllDrivers);

// Get Driver By Customers ID
DriverRoutes.get("/get-drivers/:customerId", DriverController.getDriversById);

// Add Driver
DriverRoutes.post("/add-driver", DriverController.addDriver);

// Update Driver By Driver ID
DriverRoutes.put("/edit-driver/:driverId", DriverController.editDriver);

// Delete(disable) Driver By Driver ID
DriverRoutes.delete("/delete-driver/:driverId", DriverController.deleteDriver);


module.exports = DriverRoutes;
