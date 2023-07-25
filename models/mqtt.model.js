const mongoose = require("mongoose");

const mqttSchema = mongoose.Schema(
  {
    trip_id: {
      type: String,
      required: true,
    },
    device_id: {
      type: String,
      required: true,
    },
    event: {
      type: String,
      required: true,
    },
    message: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    ignition: {
      type: Number,
      required: true,
    },
    td: {
      dv: {
        type: String,
      },
      lat: {
        type: String,
      },
      lng: {
        type: String,
      },
      spd: {
        type: String,
      },
      rssi: {
        type: String,
      },
    },

    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const mqttModel = mongoose.model("tripdata", mqttSchema);

module.exports = { mqttModel };
