const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    fromDate: {
      type: Date,
      required: true,
    },
    toDate: {
      type: Date,
      required: true,
    },
    vehicleParams: {
      CAS: {
        type: [String],
        default: [
          "Automatic Braking",
          "Accident Saved",
          "Tailgating",
          "Harsh Acceleration",
          "Sudden brake",
          "Lane change",
          "Speed bump",
          "Overspeeding",
          "Alarm 2",
          "Alarm 3",
        ],
      },
      DMS: {
        type: [String],
        default: [
          "Drowsiness",
          "Distraction",
          "No driver",
          "Overspeeding",
          "Accident Saved",
        ],
      },
    },
    recipients: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          email: {
            type: String,
            required: true,
          },
          mobileNumber: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", ReportSchema);

module.exports = Report;
