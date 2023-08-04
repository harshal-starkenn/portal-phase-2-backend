const mongoose = require("mongoose");

const vehicleFeaturesetSchema = mongoose.Schema({
  vehicle_Id: { type: String, required: true },
  userId: { type: String, required: true },
  featureSetId: {
    type: String,
    required: true,
  },
  featureSetName: {
    type: String,
    required: true,
  },
  selectCustomer: [
    {
      type: String,
      required: true,
    },
  ],
  mode: {
    type: String,
  },
  CASMode: {
    type: String,
  },

  activationSpeed: {
    type: String,
  },
  alarmThreshold: {
    type: String,
  },
  brakeThreshold: {
    type: String,
  },
  brakeSpeed: {
    type: String,
  },
  detectStationaryObject: {
    type: Number,
  },
  allowCompleteBrake: {
    type: Number,
  },
  detectOncomingObstacle: {
    type: Number,
  },
  safetyMode: {
    type: String,
  },
  ttcThreshold: {
    type: String,
  },
  brakeOnDuration: {
    type: String,
  },
  brakeOffDuration: {
    type: String,
  },
  sleepAlertMode: {
    type: String,
  },
  preWarning: {
    type: String,
  },
  sleepAlertInterval: {
    type: String,
  },
  activationSpeed: {
    type: String,
  },
  startTime: {
    type: String,
  },
  stopTime: {
    type: String,
  },

  brakeActivateTime: {
    type: String,
  },
  braking: {
    type: Number,
  },
  driverEvalMode: {
    type: String,
  },
  maxLaneChangeThreshold: {
    type: String,
  },
  minLaneChangeThreshold: {
    type: String,
  },
  maxHarshAccelerationThreshold: {
    type: String,
  },
  minHarshAccelerationThreshold: {
    type: String,
  },
  suddenBrakingThreshold: {
    type: String,
  },
  maxSpeedBumpThreshold: {
    type: String,
  },
  minSpeedBumpThreshold: {
    type: String,
  },

  GovernerMode: {
    type: String,
  },

  speedLimit: {
    type: String,
  },

  cruiseMode: {
    type: String,
  },

  activationSpeed: {
    type: String,
  },
  vehicleType: {
    type: String,
  },
  obdMode: {
    type: String,
  },
  protocolType: {
    type: String,
  },
  tpmsMode: {
    type: String,
  },
  acceleratorType: {
    type: String,
  },
  brakeType: {
    type: String,
  },

  lazerMode: {
    type: String,
  },
  rfSensorMode: {
    type: String,
  },

  rfAngle: {
    type: String,
  },
  reserved1: {
    type: String,
  },
  reserved2: {
    type: String,
  },
  reserved3: {
    type: String,
  },
  speedSource: {
    type: String,
  },
  slope: {
    type: String,
  },
  offset: {
    type: String,
  },
  delay: {
    type: String,
  },

  rfNameMode: {
    type: String,
  },
  noAlarm: {
    type: String,
  },
  speed: {
    type: String,
  },
  accelerationBypass: {
    type: String,
  },

  rfSensorAbsent: {
    type: String,
  },
  gyroscopeAbsent: {
    type: String,
  },
  hmiAbsent: {
    type: String,
  },
  timeNotSet: {
    type: String,
  },
  accelerationError: {
    type: String,
  },
  brakeError: {
    type: String,
  },
  tpmsError: {
    type: String,
  },
  simCardAbsent: {
    type: String,
  },
  lowBattery: {
    type: String,
  },
  tripNotStarted: {
    type: String,
  },
  bluetoothConnAbsent: {
    type: String,
  },
  obdAbsent: {
    type: String,
  },
  noAlarm: {
    type: String,
  },
  laserSensorAbsent: {
    type: String,
  },
  rfidAbsent: {
    type: String,
  },
  iotAbsent: {
    type: String,
  },

  firmwareOtaUpdate: {
    type: String,
  },
  firewarereserver1: {
    type: String,
  },

  alcoholDetectionMode: {
    type: String,
  },

  alcoholreserved1: {
    type: String,
  },

  driverDrowsinessMode: {
    type: String,
  },

  driverreserved1: {
    type: String,
  },
  status: { type: String, required: true },
  created_at: { type: String, required: true },
  updated_at: { type: String, required: true },
});

const vehicleFeaturesetModel = mongoose.model(
  "vehicleFeatureset",
  vehicleFeaturesetSchema
);

module.exports = { vehicleFeaturesetModel };
