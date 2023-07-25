const  driversModel  = require("../../models/Customers/Driver.model");
const express = require('express');
app = express();
const bodyPar = require("body-parser");


app.use(bodyPar.urlencoded({ extended: true }));
app.use(bodyPar.json());

//get data of all drivers 
const getAllDrivers1 = async (req, res) => {
  const { customerId } = req.params;

  try {
    const drivers = await driversModel.find({});

    if (drivers.length > 0) {
      res.status(200).send({ Result: drivers });
    } else {
      res.status(404).send("Failed to get drivers data");
    }
  } catch (err) {
    res.status(500).send("Failed to get drivers data");
  }
};

//========================{Get All Driver Data(TotalCount)}=============================//
const getAllDrivers = async (req, res) => {
  const { customerId } = req.params;

  try {
    var drivers = await driversModel.find({});
    const totalCount = drivers.length;

    if (totalCount > 0) {
      res.status(200).send({
        Result: drivers,
        TotalCount: totalCount
      });
    } else {
      res.status(404).send("Failed to get drivers data");
    }
  } catch (err) {
    res.status(500).send("Failed to get drivers data");
  }
};

//========================{Get Driver Data By ID}=======================================//
//get data of  using customerId
const getDriversById = async (req, res) => {
    
  
    try {
        const { customerId } = req.params;
        const drivers = await driversModel.find({
            customerId: customerId,
        status: { $ne: "0" },
      });
  
      if (!drivers) {
        res.status(200).send({ Result: drivers });
      } else {
        res.status(404).send("Failed to get drivers data");
      }
    } catch (err) {
      res.status(500).send("Failed to get drivers data");
    }
  };

//========================{Adding Data of Drivers}======================================//
const addDriver = async (req, res) => {
  const data = req.body;
  try {
    const checkDriver = await driversModel.find({ mobile: data.mobile });

    if (checkDriver.length > 0) {
      res.status(500).send("Driver already exists");
    } else {
      const newDriver = new driversModel({ ...data, createdBy: "userId2" });

      const result = await newDriver.save();
      res.status(200).send({ result: result });
    }
  } catch (err) {
    res.status(500).send({ Error: err.message });
  }
};

//========================{Updating the Driver}=========================================//
const editDriver = async (req, res) => {
  const { driverId } = req.params;
  const data = req.body;
  try {
    const checkDriver = await driversModel.find({
      mobile: data.mobile,
    });

    if (checkDriver.length > 0) {
      res.status(502).send("Driver Mobile number already exists");
    } else {
      const updatedDriver = await driversModel.findByIdAndUpdate(
        driverId,
        {
          $set: {
            ...data,
            modifiedAt: new Date(),
            modifiedBy: "userid",
          },
        },
        { new: true }
      );

      res.status(202).send({ result: updatedDriver });
    }
  } catch (err) {
    res.status(500).send("Error in updating driver");
  }
};

//========================{updating the status of driver to 0}==========================//
const deleteDriver = async (req, res) => {
  const { driverId } = req.params;
  try {
    const deleteDriver = await driversModel.findOneAndUpdate({ _id: driverId }, {status: false},
      {
       // status: 0,
        modifiedAt: new Date(),
        modifiedBy: "userId",
      },
      {
        new: true,
      }
    );
    if (!deleteDriver) {
      return res.status(404).send({ Error: "Failed to delete Driver" });
    }
    res.status(200).send(deleteDriver);
  } catch (err) {
    res.status(500).send("Failed to delete driver");
  }
};

module.exports = { addDriver, editDriver, deleteDriver, getAllDrivers  ,getDriversById};
