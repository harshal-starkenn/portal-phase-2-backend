const driversModel = require("../../models/Customers/Driver.model");
const VehicleModel = require("../../models/Customers/vehicles.model");
const reportsModel = require("../../models/Customers/Reports.model");
const express = require("express");
app = express();

const bodypar = require("body-parser");

app.use(bodypar.urlencoded({ extended: true }));
app.use(bodypar.json());


exports.generateReport = async (req, res) => {
  try {
    const { fromDate, toDate, vehicleName, driverName } = req.body;

    // Construct the query based on the provided parameters
    let query = {
      fromDate: new Date(fromDate),
      toDate: new Date(toDate)
    };

    if (vehicleName) {
      query['vehicleParams.CAS'] = vehicleName;
    }

    if (driverName) {
      query['vehicleParams.DMS'] = driverName;
    }

    // Count the total number of matching documents
    const totalVehiclesDrivers = await Report.countDocuments(query);

    // Prepare the report summary object
    let reportSummary = {
      title: 'Vehicle/Driver Report',
      dateRange: {
        fromDate: new Date(fromDate),
        toDate: new Date(toDate)
      },
      totalVehiclesDrivers: totalVehiclesDrivers
    };

    if (vehicleName && !driverName) {
      reportSummary.selectedVehicle = vehicleName;
    }

    if (!vehicleName && driverName) {
      reportSummary.selectedDriver = driverName;
    }

    res.status(200).json({ reportSummary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};


exports.getAllVehicalReports = async (req, res) => {
  try {
    const data = await VehicleModel.find({});
    if (!data) {
      return res.status(400).json({
        statuscode: 400,
        status: "Failed",
        message: "Vehicle Not Found",
        data: {},
      });
    }
    return res.status(200).json({
      statuscode: 200,
      status: "ok",
      message: "Vehicle Get Succesfully",
      data: {
        data,
      },
    });
  } catch (error) {
    console.log("Failed to Get Vehicle", error);
    return res.status(500).json({
      statuscode: 500,
      status: "Error",
      message: error.message,
      data: {},
    });
  }
};
