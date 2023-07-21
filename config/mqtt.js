const mqtt = require("mqtt");
require("dotenv").config();

// MQTT creds
let host = process.env.MQTT_HOST;
let port = process.env.MQTT_PORT;
let clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

let connectUrl = `mqtt://${host}:${port}`;

// Connect to MQTT server
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  reconnectPeriod: 1000,
});

// Function to end the MQTT connection
function endConnection() {
  if (client && client.connected) {
    client.end();
    console.log("Disconnected from MQTT broker");
  } else {
    console.error("MQTT client is not connected");
  }
}

module.exports = { client, endConnection };
