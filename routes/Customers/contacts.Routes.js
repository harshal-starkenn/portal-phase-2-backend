const express = require("express");
const ContactsRoutes = express.Router();
const ContactsController = require("../../controller/Customers/contacts.controller");


// Add/Insert Contacts Data
ContactsRoutes.post("/add-Contacts", ContactsController.AddContacts);

// Get Contacts Data 
ContactsRoutes.get("/get-Contacts/:Email", ContactsController.getContactsByEmail);

// Update Contacts Data
ContactsRoutes.put("/update-Contacts/:id", ContactsController.UpdateContacts);

// Delete Contacts Data
ContactsRoutes.put("/delete-Contacts/:Email", ContactsController.DeleteContacts);


module.exports = ContactsRoutes;