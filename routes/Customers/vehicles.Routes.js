const express = require("express");
const VehicleRoutes = express.Router();
const VehiclesController = require("../../controller/Customers/vehicles.controller");


 // Get All Vehicles Data
VehicleRoutes.get("/get-all-vehicle", VehiclesController.getAllVehicles);

// Add/Insert Vehicle By User Id
VehicleRoutes.post("/add-vehicle/:userId", VehiclesController.addVehicle);
 
// Edit/Update Vehicle Data By UserID/ VehicleId
VehicleRoutes.put("/update-vehicle/:userId", VehiclesController.updateVehicle); //  NOT Working

 // Delete Vehicle Data By Vehicle Id
 VehicleRoutes.put("/delete-vehicle/:vehicle_id", VehiclesController.deleteVehicle);
 
 // Getting Data of Particular vehicle
 VehicleRoutes.get("/get-vehicle/:userId", VehiclesController.getVehicle);

// Getting vehicle Data of particular user
VehicleRoutes.get("/user-vehicle/:vehicle_registration", VehiclesController.getUserVehicle);

// Getting IoT Data which is not assign to any vehicle
VehicleRoutes.get("/get-iot", VehiclesController.getIOT);

// Getting ECU Data which is not assign to any vehicle
VehicleRoutes.get("/get-ecu", VehiclesController.getECU);

// Get DMS data which is not assign to any vehicle
VehicleRoutes.get("/get-dms", VehiclesController.getDMS);

// Get DMS data which is not assign to any vehicle
VehicleRoutes.get('/devices/:customerId/:deviceType', VehiclesController.getDevicesByType);

// // Get Vehicle by trip id
// VehicleRoutes.get("/getVehicleByTripId/:id", VehiclesController.getVehicleByTripId);
// Add AS

 module.exports = VehicleRoutes; 