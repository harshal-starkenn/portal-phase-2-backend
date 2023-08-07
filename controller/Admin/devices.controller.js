const Devices = require("../../models/Admin/device.model");
const User = require("../../models/Admin/adminCustomers");
const express = require("express");
var moment = require("moment-timezone");
app = express();
const bodyParser = require("body-parser");
const Joi = require("joi");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//========================{Add Device}================================//
exports.AddDevice = async (req, res) => {
  try {
    const schema = Joi.object({
      device_id: Joi.string().required(),
      device_type: Joi.string().required(),
      customer_id: Joi.string().required(),
      sim_number: Joi.string().required(),
      status: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { device_id, device_type, customer_id, sim_number, status } = value;

    const existingDevice = await Devices.findOne({ device_id });
    const existingSimNumber = await Devices.findOne({ sim_number });

    if (existingDevice) {
      return res.status(409).send("This Device Already Taken");
    }

    if (existingSimNumber) {
      return res.status(409).send('This Sim Number Already Taken');
    }

    const createdAt = new Date();
    const currentTimeIST = moment.tz(createdAt, 'Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss a');
    const newDevice = new Devices({
      device_id,
      device_type,
      customer_id,
      sim_number,
      status,
      created_at: currentTimeIST,
      updated_at: currentTimeIST,
    });

    const savedDevice = await newDevice.save();
    console.log('Device saved successfully:', savedDevice);
    res.status(200).json({ code: 200, message: 'Device Added Successfully', addDevice: savedDevice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, message: 'Failed to add Device' });
  }
};

//========================{Get Device By ID}===========================//
exports.getDeviceById = async (req, res) => {
  try {
    const { device_id } = req.params;
    const device = await Devices.findOne({ device_id: device_id });

    if (!device) {
      return res.status(404).json({
        statuscode: 404,
        status: "Failed",
        message: "Device Not Found",
        data: {},
      });
    }

    return res.status(200).json({
      statuscode: 200,
      status: "OK",
      message: "Device Get Successful",
      data: {
        device,
      },
    });
  } catch (error) {
    console.error("Failed to get device", error);
    return res.status(500).json({
      statuscode: 500,
      status: "Error",
      message: "Failed to get device",
      data: {},
    });
  }
};

//========================{Get All Devices (totalCount)}===============//
exports.GetAllDevices = async (req, res) => {
    try {
        let device = await Devices.find({status: true}).sort({ created_at: -1 }).exec();
        totalCount = device.length;
        if(!device){
            return res.status(400).json({
                statuscode: 400,
                status: "Failed",
                message: "Devices data Not Found",
                data: {},
            });
        }
        if (totalCount > 0) {

        
        return res.status(200).json({
            statuscode: 200,
            status: "OK",
            TotalCount: totalCount,
            message: "All Devices Data Get Successfull",
            data: {
             
             device
               
            },
        });
      }
        
        } catch (error) {
        console.error("Failed to Get Devices", error);
        return res.status(500).json({
            statuscode: 500,
            status: "Error",
            message: error.message,
            data: {},
        });
        }
};

//========================={Update Devices}============================//
exports.UpdateDevice = async (req, res) => {
  try {
    const { device_id } = req.params;

    var createdAt = new Date();
    var currentTimeIST = moment
      .tz(createdAt, "Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss a");
    const updatedDevice = await Devices.findOneAndUpdate(
      { device_id },
      {
        ...req.body,
        updated_at: currentTimeIST,
      },
      { new: true }
    );

    if (!updatedDevice) {
      return res.status(404).json({ error: "Device not found" });
    }

    res
      .status(200)
      .json({ message: "Device updated successfully", updatedDevice });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update Device" });
  }
};

//========================={Delete Devices}============================//
exports.DeleteDevice = async (req, res) => {
  try {
    // var createdAt = new Date()
    // var currentTimeIST = moment.tz(createdAt,'Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss a');
    const { id } = req.params;
    const device = await Devices.findOneAndUpdate(
      { device_id: id },
      { status: false }
    );

    if (!device) {
      return res.status(404).json({ error: "Device Not Found" });
    }
    res.status(200).json({ message: "Device Deleted Successfully", device });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete Device" });
  }
};

//======================={GET devices by device type}=================//
exports.getDevicesByType = async (req, res) => {
  const { deviceType } = req.params;

  try {
    // let device = await Devices.find()
    const devices = await Devices.find({ device_type: deviceType }).sort({ created_at: -1 }).exec();
    totalCount = devices.length;
    if (devices.length > 0) {
      res.status(200).json({
        code: 200,
        status: "OK",
        TotalCount: totalCount,
        message: "Devices Data Get successfully",
        devices,
      });
    } else {
      res.status(404).json({
        code: 404,
        message: "No devices found for the specified device type",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: 500,
      message: "Failed to get devices data by device type",
    });
  }
};

//======================={GET All User data  }=======================//
exports.GetUser = async (req, res) => {
  try{
      const data = await User.find({status: "true", user_type: "2"}).sort({ created_at: -1 }).exec();
    //  totalCount = data.length;
    // if (totalCount > 0) {

    return res.status(200).json({
      statuscode: 200,
      status: "OK",
      // TotalCount: totalCount,
      message: "User Get Successfull",
      data,
    });

    //}
  } catch (err) {
    console.log(err, "error in User Data");
  }
};

//get list of all customers
exports.devicesAllCustomerList = async (req, res) => {
  try {
    const getList = await User.find({ status: true, user_type: "2" });

    if (getList.length > 0) {
      res.status(200).send(getList);
    } else {
      res.status(404).send("No customers found matching the criteria");
    }
  } catch (err) {
    res.status(500).send("Failed to get list of all customers");
  }
};
