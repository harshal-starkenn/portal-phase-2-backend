const Contacts = require("../../models/Customers/contacts.model");
const express = require("express");
const app = express();
var moment = require('moment-timezone');
const Joi = require('joi');

const bodyParser = require('body-parser'); 

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//================{Email- Validation}========================//
function isValidateEmail(Vemail) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(Vemail).toLowerCase());
  }
//========================{Add Contacts }=========================//

exports.AddContacts = async (req, res) => {
  try {
    const schema = Joi.object({
      Name: Joi.string().required(),
      Email: Joi.string().email().required(),
      Contact_Number: Joi.string().required(),
      Gender: Joi.string().required(),
    });

    const validation = schema.validate(req.body);

    if (validation.error) {
      return res.status(400).json({ message: validation.error.details[0].message });
    }

    const { Name, Email, Contact_Number, Gender } = req.body;

    const createdAt = new Date();
    const currentTimeIST = moment.tz(createdAt, 'Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss a');

    if (!isValidateEmail(Email)) {
      return res.status(401).send({
        statuscode: 401,
        status: 'Failed',
        message: 'Email Is Invalid',
        data: {},
      });
    }

    const newContacts = new Contacts({
      Name,
      Email,
      Contact_Number,
      Gender,
      created_at: currentTimeIST,
      updated_at: currentTimeIST,
    });

    const savedContacts = await newContacts.save();
    console.log('Contacts saved successfully');
    res.status(200).json({ code: 200, message: 'Contacts Added Successfully', addContacts: savedContacts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: 'Failed to add Contacts' });
  }
};


//========================{Get Contacts By Email}=================//
exports.getContactsByEmail = async (req, res) => {
    try {
      const { Email } = req.params;
      const contacts = await Contacts.findOne({Email : Email},{status: false});
  
      if (!contacts) {
        return res.status(404).json({
          statuscode: 404,
          status: "Failed",
          message: "Contacts Not Found",
          data: {},
        });
      }
  
      return res.status(200).json({
        statuscode: 200,
        status: "OK",
        message: "Contacts Get Successful",
        data: {
          contacts,
        },
      });
    } catch (error) {
      console.error("Failed to get Contacts", error);
      return res.status(500).json({
        statuscode: 500,
        status: "Error",
        message: "Failed to get Contacts",
        data: {},
      });
    }
};

//=========================={Update Contacts}=====================//
exports.UpdateContacts = async (req, res) => {
  try {
    var createdAt = new Date()
    var currentTimeIST = moment.tz(createdAt,'Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss a');
    const { id } = req.params;
    console.log(id);
   
    const {
      Name,
      Email,
      Contact_Number,
      Gender,
    } = req.body;

    const updatedContacts = await Contacts.findByIdAndUpdate(
      id,
      {
        Name,
        Email,
        Contact_Number,
        Gender,
        "updated_at": currentTimeIST,
      },
      { new: true }
    );
console.log('Contacts Update Successfully');
    if (!updatedContacts) {
      return res.status(404).json({ code: 404, message: 'Contacts not found' });
    }

    res.status(200).json({ code: 200, message: 'Contacts updated successfully', updatedContacts });
  } catch (error) {
    console.log(error);
    res.status(500).json({ code: 500, message: 'Failed to update Contacts' });
  }
};

//=========================={Delete Contacts}======================//
exports.DeleteContacts = async (req, res) => {
    try {
        const { Email } = req.params;
        const contacts = await Contacts.findOneAndUpdate({ Email: Email},{status: false});

        if(!contacts) {
            return res.status(404).json({ error: "Contacts Not Found"});
        }
    res.status(200).json({ message: 'Contacts Deleted Successfully', contacts });
  } catch (error) { 
    console.log(error); 
    res.status(500).json({ error: 'Failed to delete Contacts' });
  }
};