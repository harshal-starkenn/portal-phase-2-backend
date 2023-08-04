const express = require("express");
const DevicesRoutes = express.Router();
const DevicesController = require("../../controller/Admin/devices.controller");

// Get All Devices Data
DevicesRoutes.get("/get-all-devices", DevicesController.GetAllDevices);

// Add/Insert Devices Data
DevicesRoutes.post("/add-Device", DevicesController.AddDevice);

// Edit/update Device Data By Id
DevicesRoutes.put("/update-device/:device_id", DevicesController.UpdateDevice);

// Delete Device Data By Id
DevicesRoutes.put("/delete-device/:id", DevicesController.DeleteDevice);

// Get User Devices Data By User Id
DevicesRoutes.get("/get-user", DevicesController.GetUser);

// Get Device data By Device Id
DevicesRoutes.get("/get-device/:device_id", DevicesController.getDeviceById);

// Get Device Data By Device Type
DevicesRoutes.get("/devices/:deviceType", DevicesController.getDevicesByType);

//get list of all customers
DevicesRoutes.get("/get-customers", DevicesController.devicesAllCustomerList);

module.exports = DevicesRoutes;
