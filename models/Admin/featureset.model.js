const mongoose = require("mongoose");

const featuresetSchema = mongoose.Schema({
  featureSetId: {
    type: String,
    required: true,
    unique: true,
  },
  featureSetName: {
    type: String,
    required: true,
    unique: true,
  },
  selectCustomer: [
    {
      type: String,
      required: true,
    },
  ],
  systemType: {
    offlineMode: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
    onlineMode: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
    version1: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
    version: {
      type: String,
    },
  },
  collisionAvoidanceSystem: {
    disable: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
    enable: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
    activationSpeed: {
      type: Number,
      default: 2,
    },
    alarmThreshold: {
      type: Number,
      default: 0.5,
    },
    brakeThreshold: {
      type: Number,
      default: 40,
    },
    brakeSpeed: {
      type: String,
      default: "No",
    },
    detectStationaryObject: {
      type: String,
      default: "No",
    },
    allowCompleteBrake: {
      type: String,
      default: "No",
    },
    detectOncomingObstacle: {
      type: String,
      default: "Normal",
    },
    safetyMode: {
      type: Number,
      default: 350,
    },
    ttcThreshold: {
      type: Number,
      default: 1000,
    },
    brakeOnDuration: {
      type: Number,
      default: 1000,
    },
    brakeOffDuration: {
      type: Number,
      default: 1000,
    },
  },
  sleepAlert: {
    disable: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
    enable: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
    preWarning: {
      type: Number,
      default: 5,
    },
    sleepAlertInterval: {
      type: Number,
      default: 40,
    },
    activationSpeed: {
      type: Number,
      default: 23,
    },
    startTime: {
      type: Number,
      default: 6,
    },
    stopTime: {
      type: String,
      default: "No",
    },
    braking: {
      type: Number,
      default: 10,
    },
    brakeActivateTime: {
      type: Number,
    },
  },
  driverEval: {
    disable: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
    enable: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
    maxLaneChangeThreshold: {
      type: Number,
      default: 0.35,
    },
    minLaneChangeThreshold: {
      type: Number,
      default: -0.35,
    },
    maxHarshAccelerationThreshold: {
      type: Number,
      default: -0.4,
    },
    minHarshAccelerationThreshold: {
      type: Number,
      default: -0.4,
    },
    suddenBrakingThreshold: {
      type: Number,
      default: 0.5,
    },
    maxSpeedBumpThreshold: {
      type: Number,
      default: -0.5,
    },
    minSpeedBumpThreshold: {
      type: Number,
    },
  },
  speedGovernor: {
    disable: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
    enable: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
    speedLimit: {
      type: Number,
      default: 100,
    },
  },
  cruise: {
    disable: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
    enable: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
    activationSpeed: {
      type: Number,
      default: 40,
    },
    vehicleType: {
      type: String,
    },
  },
  obd: {
    disable: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
    enable: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
    protocolType: {
      type: String,
      enum: ["SAE J1939"],
    },
  },
  tpms: {
    disable: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
    enable: {
      type: String,
      enum: ["Disable", "Enable"],
      default: "Disable",
    },
  },
  vehicleSettings: {
    sensor: {
      acceleratorType: {
        type: String,
      },
      cylinder: {
        type: String,
      },
      brakeType: {
        type: String,
      },
    },
    laserSensor: {
      disable: {
        type: String,
        enum: ["Disable", "Enable"],
        default: "Disable",
      },
      enable: {
        type: String,
        enum: ["Disable", "Enable"],
        default: "Disable",
      },
    },
    rfSensor: {
      disable: {
        type: String,
        enum: ["Disable", "Enable"],
        default: "Disable",
      },
      enable: {
        type: String,
        enum: ["Disable", "Enable"],
        default: "Disable",
      },
      rfAngle: {
        type: Number,
        default: 0,
      },
      reserved1: {
        type: Number,
        default: 0,
      },
      reserved2: {
        type: Number,
        default: 0,
      },
      reserved3: {
        type: Number,
        default: 0,
      },
    },
    speedSettings: {
      speedWire: {
        type: String,
      },
      speedSource: {
        type: String,
      },
      slope: {
        type: Number,
        default: 4.5,
      },
      offset: {
        type: Number,
        default: 0.5,
      },
    },
    shutdownDelay: {
      delay: {
        type: Number,
        default: 30,
      },
    },
    rfName: {
      disable: {
        type: String,
        enum: ["Disable", "Enable"],
        default: "Disable",
      },
      enable: {
        type: String,
        enum: ["Disable", "Enable"],
        default: "Disable",
      },
    },
    timeBasedErrors: {
      noAlarm: {
        type: Number,
        default: 30,
      },
      speed: {
        type: Number,
        default: 30,
      },
      accelerationBypass: {
        type: Number,
        default: 10,
      },
    },
    speedBasedErrors: {
      rfSensorAbsent: {
        type: Number,
        default: 60,
      },
      gyroscopeAbsent: {
        type: Number,
        default: 60,
      },
      hmiAbsent: {
        type: Number,
        default: 60,
      },
      timeNotSet: {
        type: Number,
        default: 60,
      },
      accelerationError: {
        type: Number,
        default: 60,
      },
      brakeError: {
        type: Number,
        default: 60,
      },
      tpmsError: {
        type: Number,
        default: 60,
      },
      simCardAbsent: {
        type: Number,
        default: 60,
      },
      lowBattery: {
        type: Number,
        default: 60,
      },
      tripNotStarted: {
        type: Number,
        default: 60,
      },
      bluetoothConnAbsent: {
        type: Number,
        default: 60,
      },
      obdAbsent: {
        type: Number,
        default: 60,
      },
      noAlarm: {
        type: Number,
        default: 60,
      },
      laserSensorAbsent: {
        type: Number,
        default: 60,
      },
      rfidAbsent: {
        type: Number,
        default: 60,
      },
      iotAbsent: {
        type: Number,
        default: 60,
      },
    },
    firmwareOtaUpdate: {
      notAvailable: {
        type: String,
        default: "Not Available",
      },
      available: {
        type: String,
        default: "Available",
      },
      reserved1: {
        type: Number,
        default: 0,
      },
    },
    alcoholDetection: {
      disable: {
        type: String,
        enum: ["Disable", "Enable"],
        default: "Disable",
      },
      enable: {
        type: String,
        enum: ["Disable", "Enable"],
        default: "Disable",
      },
      reserved1: {
        type: Number,
        default: 0,
      },
    },
    driverDrowsiness: {
      disable: {
        type: String,
        enum: ["Disable", "Enable"],
        default: "Disable",
      },
      enable: {
        type: String,
        enum: ["Disable", "Enable"],
        default: "Disable",
      },
      reserved1: {
        type: Number,
        default: 0,
      },
    },
  },
  status: {
    type: String,
  },
});

const featuresetModel = mongoose.model("featureset", featuresetSchema);

module.exports = { featuresetModel };
