const { client } = require("../config/mqtt");
//const async = require("async");
const { mqttModel } = require("../models/mqtt.model");
const Devices = require("../models/Admin/device.model");

const getmqttData = () => {
  client.on("connect", async () => {
    console.log("Connected to mqtt broker");

    const getDevices = await Devices.find();

    getDevices.forEach((el) => {
      const getTopic = `starkennInv3/${el.device_id}/data`;

      client.subscribe(getTopic, (err) => {
        if (err) {
          console.log("Error in Subscribing to topic");
        } else {
          console.log(`Successfully subscribed to this ${el.device_id}`);
        }
      });
    });
  });

  client.on("message", async (topic, message) => {
    try {
      const addTripData = async.queue(async (task, callback) => {
        // console.log(task.message);

        const newData = new mqttModel(task.message);
        const tripData = await newData.save();

        console.log("tripData Added");
      });

      //Parsing the message got from mqtt
      // console.log(message.toString());

      const messageString = message.toString();
      const parseString = JSON.parse(messageString);

      //pushing the data got from mqtt to async.queue function
      addTripData.push({ topic: topic, message: parseString }, (err) => {
        if (err) throw err;
      });
    } catch (err) {
      console.log("Error in addin tripData:", err);
    }
  });
};

module.exports = { getmqttData };
