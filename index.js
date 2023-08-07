const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const cors = require("cors");
var bodyParser = require("body-parser");

// const { getmqttData } = require("./controller/tripMqtt.controller");

//const { getmqttData } = require("./controller/tripMqtt.controller");
const { db } = require("./config/db");


const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
// getmqttData();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//=========================={Middlewares-Router-Connection}================================//

//-----------------{Admin}-----------------------//
const AdminRouter = require("./routes/Admin/Admin.Routes");

//-----------------{Admin-Customer}--------------//
const AdminCustomerRouter = require("./routes/Admin/adminCustomers.Routes");

//-----------------{Admin-Device}----------------//
const DevicesRouter = require("./routes/Admin/devices.Routes");

//-----------------{Admin-AnalyticsThreshold}----//
const ATRouter = require("./routes/Admin/AnalyticsThreshold.Routes");

//-----------------{Admin - FeatureSet}----------// 
const { featuresetRouter } = require("./routes/Admin/featureset.route");

//-----------------{Customer}--------------------//
const Customers = require("./routes/Customers/User.Routes");

//-----------------{Customers-Vehicels}----------//
const VehiclesRouter = require("./routes/Customers/vehicles.Routes");

//-----------------{Customers-Drivers}-----------//
const DriverRouter = require("./routes/Customers/driver.Routes");

//-----------------{Customers-Driver-RFID}-------//
const RFIDRouter = require("./routes/Customers/RFID.Routes");

//-----------------{Customers-Contacts}----------//
const ContactRouter = require("./routes/Customers/contacts.Routes");

//-----------------{Customers-Reports}-----------//
const ReportsRouter = require("./routes/Customers/reports.Routes");
//const { featuresetRouter } = require("./routes/Admin/featureset.route");


//==================================={Middlewares--URL/Router-Connection}===============================//

//Featureset Apis
app.use("/api/featureset", featuresetRouter);

//------------------------{Admin}-------Not USE----------------------//
app.use("/api/admin/remove", AdminRouter);

//----------------------{Admin-Customer}-------------------//
app.use("/api/admin", AdminCustomerRouter);

//----------------------{Admin-Device}---------------------//
app.use("/api/admin/devices", DevicesRouter);

//----------------------{Admin-Analytics-ThresHold}--------//
app.use("/api/admin/analytics-threshold", ATRouter);

//----------------------{Customer-Vehicles}----------------//As per required
app.use("/api/customers/vehicles", VehiclesRouter);

//----------------------{Customer}-------------------------//
app.use("/api/customers", Customers);

//----------------------{Customer-Vehicles}----------------//
app.use("/api/customers/vehicles", VehiclesRouter);

//----------------------{Customers-Drivers}----------------//
app.use("/api/customers/drivers", DriverRouter);

//----------------------{Customers-Driver-RFID}------------//
app.use("/api/customers/driver/driver-rfid", RFIDRouter);

//----------------------{Customers-Contacts}---------------//
app.use("/api/customers/contacts", ContactRouter);

//----------------------{Customers-Reports}----------------//
app.use("/api/customers/reports", ReportsRouter);

//---------------------------Data-Base Connection Start----------------------------//
db();

// mongoose
//   .connect(process.env.MONGODB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("DataBase Mongodb Connected To the Server..."))
//   .catch((err) => console.error(err));

//--------------------------Data-Base Connection End--------------------------------//

//--------------------------Server Start-------------------------------------------//
app.listen(PORT, () => console.log("Server running on port " + PORT));
