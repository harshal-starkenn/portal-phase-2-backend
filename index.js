const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const cors = require("cors");
var bodyParser = require('body-parser');
const PORT = process.env.PORT 


app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//=========================={Middlewares-Router-Connection}================================//

//-----------------{Admin}-----------------------//
const AdminRouter = require("./routes/Admin/Admin.Routes")

//-----------------{Admin-Customer}--------------//
const AdminCustomerRouter = require("./routes/Admin/adminCustomers.Routes");

//-----------------{Admin-Device}----------------//
const DevicesRouter = require("./routes/Admin/devices.Routes");

//-----------------{Admin-AnalyticsThreshold}----//
const ATRouter = require("./routes/Admin/AnalyticsThreshold.Routes");

//-----------------{Customer}--------------------//
const Customers = require("./routes/Customers/User.Routes");

//-----------------{Customers-Vehicels}----------//
const VehiclesRouter = require("./routes/Customers/vehicles.Routes");

//-----------------{Customers-Drivers}-----------//
const DriverRouter  = require("./routes/Customers/driver.Routes");

//-----------------{Customers-Driver-RFID}-------//
const RFIDRouter = require("./routes/Customers/RFID.Routes");

//-----------------{Customers-Contacts}----------//
const ContactRouter = require("./routes/Customers/contacts.Routes");

//-----------------{Customers-Reports}-----------//
const ReportsRouter = require("./routes/Customers/reports.Routes");



//==================================={Middlewares--URL/Router-Connection}===============================//


//------------------------{Admin}-----------------------------//
app.use("/api/Admin/remove",AdminRouter);

//----------------------{Admin-Customer}-------------------//
app.use("/api/Admin",AdminCustomerRouter);

//----------------------{Admin-Device}---------------------//
app.use("/api/Admin/Devices", DevicesRouter);

//----------------------{Admin-Analytics-ThresHold}--------//
app.use("/api/Admin/AnalyticsThreshold", ATRouter);

//----------------------{Customer}-------------------------//
app.use("/api/Customers",Customers);

//----------------------{Customer-Vehicles}----------------//
app.use("/api/Customers/Vehicles", VehiclesRouter);

//----------------------{Customers-Drivers}----------------//
app.use("/api/Customers/Drivers", DriverRouter);

//----------------------{Customers-Driver-RFID}------------//
app.use("/api/Customers/Drivers/DriverRFID", RFIDRouter);

//----------------------{Customers-Contacts}---------------//
app.use("/api/Customers/Contacts", ContactRouter);

//----------------------{Customers-Reports}----------------//
app.use("/api/Customers/Reports", ReportsRouter);


//---------------------------Data-Base Connection Start----------------------------//
mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("DataBase Mongodb Connected To the Server..."))
    .catch((err) => console.error(err));


//--------------------------Data-Base Connection End--------------------------------// 


//--------------------------Server Start-------------------------------------------//
app.listen(PORT, () => console.log("Server running on port " + PORT));