const express = require("express");
const ContactsRoutes = express.Router();
const ContactsController = require("../../controller/Customers/contacts.controller");


// Add/Insert Contacts Data
ContactsRoutes.post("/add-contacts", ContactsController.AddContacts);

// Get Contacts Data 
ContactsRoutes.get("/get-contacts/:email", ContactsController.getContactsByEmail);

// Update Contacts Data
ContactsRoutes.put("/update-contacts/:id", ContactsController.UpdateContacts);

// Delete Contacts Data
ContactsRoutes.put("/delete-contacts/:email", ContactsController.DeleteContacts);


module.exports = ContactsRoutes;