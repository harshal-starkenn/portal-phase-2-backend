const express = require("express");
const RFIDRoutes = express.Router();
const RFIDController = require("../../controller/Customers/DriverRFID.controller");


// Add/Insert Driver RFID Data
RFIDRoutes.post("/add-rfid", RFIDController.AddRFID);

// Update Driver RFID Data
//RFIDRoutes.put("/update-RFID", RFIDController.updateRFID);

// Get Driver RFID Data
//RFIDRoutes.get("/get-RFID", RFIDController.getRFID);

// Delete(disable) Driver RFID Data
//RFIDRoutes.delete("/disable-RFID", RFIDController.disableRFID);


module.exports = RFIDRoutes;