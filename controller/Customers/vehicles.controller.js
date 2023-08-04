const Vehicle = require("../../models/Customers/vehicles.model");
const Device = require("../../models/Admin/device.model");
const Users = require('../../models/Admin/adminCustomers');
const express = require("express");
var moment = require('moment-timezone');
const app = express();

const bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
const { v4: uuidv4 } = require('uuid');

//==========================={Adding vehicle Into DataBase By Store Procedure -- START======================//

// Insert/Add Vehicle
exports.addVehicle = async (req, res) => {
    const { userId } = req.params;
  
  // Generate a new unique UUID
 // const userId = uuidv4();
 
    const checkQuery = { 
      vehicle_registration: req.body.vehicle_registration
    };
  
    try {
      const existingVehicle = await Vehicle.findOne(checkQuery).exec();
      var createdAt = new Date()
      var currentTimeIST = moment.tz(createdAt,'Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss a');
      if (existingVehicle) {
        res.status(500).send({ Error: "Vehicle Already Exists" });
      } else {
        let addData = {
          userId, //:req.body.userId, // Assuming this is the correct field name for the user ID
          vehicle_name: req.body.vehicle_name,
          vehicle_registration: req.body.vehicle_registration,
          featureset: 1,
          status: req.body.status,
         "created_at": currentTimeIST,
          "updated_at": currentTimeIST,
         

        };
  
        if (req.body.dms && req.body.iot == null && req.body.ecu == null) {
          addData.dms = req.body.dms;
        } else if (req.body.dms == null && req.body.iot && req.body.ecu) {
          addData.ecu = req.body.ecu;
          addData.iot = req.body.iot;
        } else {
          addData.ecu = req.body.ecu;
          addData.iot = req.body.iot;
          addData.dms = req.body.dms;
        }
  
        const newVehicle = await Vehicle.create(addData);
        res.status(200).send({ addData: newVehicle });
      }
    } catch (err) {
      res.status(500).send({ Error: err.message });
    }
  };
// Adding vehicle Into DataBase By Store Procedure -- END//

// Getting All Vehicle Data  --START//
exports.getAllVehicles = async (req, res) => {
    try{
        const { userId } = req.body
        const data = await Vehicle.find({ }).sort({ created_at: -1 }).exec();
        totalCount = data.length;
        if (totalCount > 0) {
        // if(!device){

        return res.status(200).json({
            statuscode: 200,
            status: 'OK',
            TotalCount: totalCount,
            message: 'Vehicle Data',
            data
          });
        // }
      }
          } catch (err) {
            console.log(err, "error in Vehicle Data")
          }
    
  };
// Getting All Vehicle Data  --END//

// Get Vehicle Data By User Id -- START //
exports.getVehicle = async (req, res) => {
    try {
      const { userId } = req.params;
      const data = await Vehicle.find({ userId })
      return res.status(200).json({
        statusCode: 200,
        status: 'OK',
        message: 'Vehicle Data',
        data
      });
    } catch (err) {
      console.log(err, 'error in Vehicle Data');
      return res.status(500).json({
        statusCode: 500,
        status: 'Internal Server Error',
        message: 'An error occurred while retrieving vehicle data',
        error: err
      });
    }
  };
// Get Vehicle Data By User Id  -- END//

// Get Vehicle Data By Vehicle Id -- START //
exports.getUserVehicle = async (req, res) => {
try {
  const { vehicle_registration } = req.params
  const data = await Vehicle.findOne({vehicle_registration });
  return res.status(200).json({
    statusCode: 200,
    status: 'OK',
    message: 'Vehicle Data',
    data
  }); 
}catch (err) {
  console.log(err, 'error in Vehicle Data');
  return res.status(500).json({
    statusCode: 500,
    status: 'Internal Server Error',
    message: 'An error occured While retrieving Vehicle data',
    error: err
  });
}
};
// Get Vehicle Data By Vehicle Id  -- END//

// Getting IoT Data which is not assign to any vehicle -- START //
exports.getIOT = async (req, res) => {
  try {
    const { user_id } = req.params;

    const iotData = await Vehicle.find({
     

      user_id,
      iot: { $exists: true }
    });
    totalCount = iotData.length;
if (totalCount > 0) {
    res.status(200).json({
      statusCode: 200,
      status: 'OK',
      TotalCount: totalCount,
      message: 'IoT Data',
      data: iotData
    });
  }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      status: 'Internal Server Error',
      message: 'An error occurred while retrieving IoT data',
      error: err.message
    });
  }
  };
// Getting IoT Data which is not assign to any vehicle -- END //

// Getting ECU Data which is not assign to any vehicle -- START//
exports.getECU = async (req, res) => {
  try {
    const { user_id } = req.params;

    const ecuData = await Vehicle.find({
      user_id,
      ecu: { $exists: true }
    });
   totalCount = ecuData.length;
   if (totalCount > 0) {
    res.status(200).json({
      statusCode: 200,
      status: 'OK',
      TotalCount: totalCount,
      message: 'ECU Data',
      data: ecuData
    });
  }
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      status: 'Internal Server Error',
      message: 'An error occurred while retrieving ECU data',
      error: err.message
    });
  }
  };
// Getting ECU Data which is not assign to any vehicle -- END//

// Getting DMS Data which is not assign to any vehicle -- START//
exports.getDMS = async (req, res) => {
  try {
    const { user_id } = req.params;

    const dmsData = await Vehicle.find({
      user_id,
      dms: { $exists: true }
    });
totalCount = dmsData.length;
if (totalCount > 0) {}
    res.status(200).json({
      statusCode: 200,
      status: 'OK',
      Totalount: totalCount,
      message: 'DMS Data',
      data: dmsData
    });
  } catch (err) {
    res.status(500).json({
      statusCode: 500,
      status: 'Internal Server Error',
      message: 'An error occurred while retrieving DMS data',
      error: err.message
    });
  }
  };
// Getting DMS Data which is not assign to any vehicle -- END//

// Update Vehicle Info -START (EXP) //
exports.updateVehicle1 = async(req, res) => {
    const { userId } = req.params;
  
    try {
      // const checkQuery = {
      //   vehicle_registration: req.body.vehicle_registration
      // };
  
      const existingVehicle = await Vehicle.findOne({userId}).exec();
  
      if (existingVehicle && existingVehicle._id.toString() !== userId) {
        return res.status(500).send({ Error: "Vehicle Already Exists" });
      }
  
      const updateData = {
        vehicle_name: req.body.vehicle_name,
        vehicle_registration: req.body.vehicle_registration,
        featureset: 1,
        status: req.body.status,
        
      };
  
      if (req.body.dms && req.body.iot == null && req.body.ecu == null) {
        updateData.dms = req.body.dms;
        updateData.$unset = { iot: "", ecu: "" }; // Unset iot and ecu fields if they exist
      } else if (req.body.dms == null && req.body.iot && req.body.ecu) {
        updateData.iot = req.body.iot;
        updateData.ecu = req.body.ecu;
        updateData.$unset = { dms: "" }; // Unset dms field if it exists
      } else {
        updateData.iot = req.body.iot;
        updateData.ecu = req.body.ecu;
        updateData.dms = req.body.dms;
      }
  
      const updatedVehicle = await Vehicle.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      );
  
      if (!updatedVehicle) {
        return res.status(404).send({ Error: "Vehicle not found" });
      }
  
      res.status(200).send({ updatedData: updatedVehicle });
    } catch (err) {
      res.status(500).send({ Error: err.message });
    }
  };
// Update Vehicle Info -END (EXP)//

// Update Vehicle Info -START  Add Device(ECU, IOT, DMS)//
exports.updateVehicle = async (req, res) => {
  const { userId } = req.params;

  try {
    const existingVehicle = await Vehicle.findOne({ userId: userId }).exec();
    const createdAt = new Date();
    const currentTimeIST = moment.tz(createdAt, 'Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss a');

    if (!existingVehicle) {
      return res.status(404).send({ Error: 'Vehicle not found for the given user' });
    } else {
      const updateData = {};
      if (req.body.dms && req.body.iot == null && req.body.ecu == null) {
        updateData.dms = req.body.dms;
      } else if (req.body.dms == null && req.body.iot && req.body.ecu) {
        updateData.ecu = req.body.ecu;
        updateData.iot = req.body.iot;
      } else {
        updateData.ecu = req.body.ecu;
        updateData.iot = req.body.iot;
        updateData.dms = req.body.dms;
      }

      updateData.updated_at = currentTimeIST;

      const updatedVehicle = await Vehicle.findOneAndUpdate(
        { userId: userId },
        { $set: updateData },
        { new: true }
      ).exec();

      res.status(200).send({ updatedVehicle });
    }
  } catch (err) {
    res.status(500).send({ Error: err.message });
  }
};

// Delete Vehicle -START //
exports.deleteVehicle = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await Vehicle.findOneAndUpdate({ userId }, {status: false});
    return res.status(200).json({
      statusCode: 200,
      status: 'OK',
      message: 'Vehicle Data Succesfully Deleted',
      data
    });
  } catch (err) {
    console.log(err, 'error in Vehicle Data');
    return res.status(500).json({
      statusCode: 500,
      status: 'Internal Server Error',
      message: 'An error occurred while retrieving vehicle data',
      error: err
    });
  }
};
// Delete Vehicle -END //1

// Add Device (DMS, ECU, IOT) -- START //
exports.AddAssignDevice = async (req, res) => {
  const { dms, ecu, iot } = req.body;
}
// Add Device (DMS, ECU, IOT) -- END //

//======================={GET devices by device type}=================//
exports.getDevicesByType = async (req, res) => {
    const { deviceType } = req.params;
    const { customerId } = req.params;
  
    try {
      // let device = await Devices.find()
      const devices = await Device.find({ device_type: deviceType ,customer_id: customerId }).sort({ created_at: -1 }).exec();
      totalCount = devices.length;
      if (devices.length > 0) {
        res.status(200).json({
          code: 200,
          status: "OK",
          TotalCount: totalCount,
          message: 'Devices Data Get successfully',
          devices,
        });
        
      } else {
        res.status(404).json({
          code: 404,
          message: 'No devices found for the specified device type',
        });
        
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({
        code: 500,
        message: 'Failed to get devices data by device type',
      });
    }
  };
