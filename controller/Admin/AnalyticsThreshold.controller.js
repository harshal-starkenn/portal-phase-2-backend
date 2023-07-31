const AnalyticsThresholds = require("../../models/Admin/AT.model");
const Customers = require("../../models/Admin/adminCustomers");
var moment = require('moment-timezone');

const express = require('express');
const bodyParser = require("body-parser");
app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());


//=======================================ADD - Analytics-Threshold-=====================================================//
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
  // exports.AddAnalytics1 = async (req, res) => {
  //   try {
  //     const customers = req.body; // Assuming an array of customers in the request body
  
  //     if (!Array.isArray(customers) || customers.length === 0) {
  //       return res.status(400).json({ message: "Invalid or empty customer array" });
  //     }
  
  //     const currentTimeIST = moment.tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss a');
  
  //     const saved_ATs = await Promise.all(
  //       customers.map(async (customer) => {
  //         const {
  //           title,
  //           customer_id,
  //           brake,
  //           tailgating,
  //           rash_driving,
  //           sleep_alert,
  //           over_speed,
  //           green_zone,
  //           minimum_distance,
  //           minimum_driver_rating,
  //           ttc_difference_percentage,
  //           total_distance,
  //           duration,
  //         } = customer;
  
  //         if (
  //           !title ||
  //           !customer_id ||
  //           !brake ||
  //           !tailgating ||
  //           !rash_driving ||
  //           !sleep_alert ||
  //           !over_speed ||
  //           !green_zone ||
  //           !minimum_distance ||
  //           !minimum_driver_rating ||
  //           !ttc_difference_percentage ||
  //           !total_distance ||
  //           !duration
  //         ) {
  //           return { customer_id, status: "Missing required fields" };
  //         }
  
  //         const new_AT = new AnalyticsThresholds({
  //           title,
  //           customer_id,
  //           newScore: {
  //             brake,
  //             tailgating,
  //             rash_driving,
  //             sleep_alert,
  //             over_speed,
  //             green_zone,
  //           },
  //           newIncentive: {
  //             minimum_distance,
  //             minimum_driver_rating,
  //           },
  //           newAccident: {
  //             ttc_difference_percentage,
  //           },
  //           newLB: {
  //             total_distance,
  //           },
  //           newHalt: {
  //             duration,
  //           },
  //           created_at: currentTimeIST,
  //           updated_at: currentTimeIST,
  //         });
  
  //         const saved_AT = await new_AT.save();
  //         console.log("AT Score Generated Successfully!", saved_AT);
  //         return { customer_id, status: "Success", saved_AT };
  //       })
  //     );
  
  //     const response = {
  //       code: 200,
  //       message: "AT Scores Generated Successfully",
  //       saved_ATs,
  //     };
  
  //     res.status(200).json(response);
  //   } catch (error) {
  //     console.log(error);
  
  //     if (error.name === "ValidationError") {
  //       const validationErrors = Object.values(error.errors).map((err) => err.message);
  //       return res.status(400).json({
  //         code: 400,
  //         message: "Validation error",
  //         errors: validationErrors,
  //       });
  //     }
  
  //     res.status(500).json({
  //       code: 500,
  //       message: "Failed to add scores",
  //     });
  //   }
  // };
  
  
//=======================================GET All Customers data -=======================================================//
exports.GetCustomers_AT = async (req, res) => {
  try{
      const data = await Customers.find({user_type: "0", status: "true"}).sort({ created_at: -1 }).exec();
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

//=======================================GET  Analytics-Threshold--=====================================================//
exports.GetAnalyticsThreshold = async (req, res) => {

  try{
    let AT = await AnalyticsThresholds.find({status: true}).sort({ created_at: -1}).exec();
    totalCount = AT.length;
    if(!AT){
      return res.status(400).json({
        statuscode: 400,
        status: "Failed",
        message: "Analytics ThresHold Not Found",
        data: {},
      });
    }
    if (totalCount > 0) {

      return res.status(200).json({
        statuscode: 200,
        status: "OK",
        totalCount: totalCount,
        message: "ALL Analytics Thresholds Get Succesfully",
        data: {
          AT
        },
      });
    }
  } catch (error) {
    console.error("Failed to get Analytics Thresholds", error);
    return res.status(500).json({
      statuscode: 500,
      status: "Error",
      message: error.message,
      data: {},
    });
  }
};

//=======================================UPDATE  Analytics-Threshold--==================================================//
exports.Update_AT = async (req, res) => {
  try {
    const{title,customer_id} = req.body;
    const{ brake, tailgating, rash_driving, sleep_alert, over_speed, green_zone } = req.body;
    const{ minimum_distance, minimum_driver_rating } = req.body;
    const{ ttc_difference_percentage } = req.body;
    const{total_distance} = req.body;
    const{duration} = req.body;
    
    const updatedAt = new Date();
    const currentTimeIST = moment
      .tz(updatedAt, "Asia/Kolkata")
      .format("YYYY-MM-DD HH:mm:ss a");

    const filter = { customer_id: customer_id }; // Update criteria, you may use any unique identifier

    const update = { $set: { title:title, brake:brake, tailgating:tailgating, rash_driving:rash_driving, 
                             sleep_alert:sleep_alert, over_speed:over_speed, green_zone :green_zone,
                             minimum_distance:minimum_distance, minimum_driver_rating:minimum_driver_rating,
                             ttc_difference_percentage:ttc_difference_percentage,total_distance:total_distance,
                             duration:duration,
      updated_at: currentTimeIST } };

    const updated_AT = await AnalyticsThresholds.findOneAndUpdate(
      filter,
      update,
      { new: true }
    );

    if (!updated_AT) {
      return res.status(404).json({
        code: 404,
        message: "No matching document found for the provided customer_id",
      });
    }

    console.log("AT Score Updated Successfully!", updated_AT);

    const response = {
      code: 200,
      message: "AT Score Updated Successfully",
      updated_AT,
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
      message: "Failed to update scores",
    });
  }
};

//=======================================DELETE  Analytics-Threshold--=================================================//
exports.Delete_AT = async (req, res) => {
try{

  const { customer_id } = req.params;
  const AT = await AnalyticsThresholds.findOneAndUpdate({ customer_id: customer_id}, {status: false});

  if(!AT) {
    return res.status(404).json({ error: "Customers Analytics Thresholds Not Found"});
  }
  res.status(200).json({ message: "Customers Analytics Thresholds Delete Successfully", AT});
} catch (error) {
  console.log(error);
  res.status(500).json({error: "Failed to delete Customers Analytics Thresholds"});
}
};