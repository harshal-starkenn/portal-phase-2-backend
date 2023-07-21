const AnalyticsThresholds = require("../../models/Admin/AT.model");
const Customers = require("../../models/Admin/adminCustomers");
var moment = require('moment-timezone');

const express = require('express');
const bodyParser = require("body-parser");
app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


//=======================================Analytics-Threshold-======================================================//

exports.AddAnalytics = async (req, res) => {
    try {
        const{title,customer_id} = req.body;
        const{ brake, tailgating, rash_driving, sleep_alert, over_speed, green_zone } = req.body;
        const{ minimum_distance, minimum_driver_rating } = req.body;
        const{ ttc_difference_percentage } = req.body;
        const{total_distance} = req.body;
        const{duration} = req.body;
  
      if (
        !title ||
        !customer_id ||
        !brake ||
        !tailgating ||
        !rash_driving ||
        !sleep_alert ||
        !over_speed ||
        !green_zone ||
        !minimum_distance ||
        !minimum_driver_rating ||
        !ttc_difference_percentage ||
        !total_distance ||
        !duration
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      var createdAt = new Date()
      var currentTimeIST = moment.tz(createdAt,'Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss a');
      const new_AT = new AnalyticsThresholds({
        title:title,
        customer_id:customer_id,
        newScore:
        {
        brake,
        tailgating,
        rash_driving,
        sleep_alert,
        over_speed,
        green_zone,
        },
        newIncentive:{

        minimum_distance,
        minimum_driver_rating,
        },
        newAccident:{
        ttc_difference_percentage,
        },
        newLB:{
        total_distance,
        },
        newHalt:{
        duration,
        },
        "created_at": currentTimeIST,
        "updated_at": currentTimeIST,
      });


      const [saved_AT] = await Promise.all([
        new_AT.save(),
      ]);
  
      console.log(
        "AT Score Generated Successfully!",
        saved_AT,
      );
  
      const response = {
        code: 200,
        message: "AT Score Generated Successfully",
        saved_AT
      };
  
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
  
      if (error.name === "ValidationError") {
        const validationErrors = Object.values(error.errors).map(
          (err) => err.message
        );
        return res.status(400).json({
          code: 400,
          message: "Validation error",
          errors: validationErrors,
        });
      }
  
      res.status(500).json({
        code: 500,
        message: "Failed to add scores",
      });
    }
  };

//======================={GET All Customers data  }=======================//
exports.GetCustomers_AT = async (req, res) => {
  try{
      const data = await Customers.find({});
    //  totalCount = data.length;
     // if (totalCount > 0) {

      return res.status(200).json({
          statuscode: 200,
          status: 'OK',
         // TotalCount: totalCount,
          message: 'Customers Get Successfull',
          data
        });
     
    //}
        } catch (err) {
          console.log(err, "error in Customers Data")
        }
  
};