const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const db = async () => {
  const MONGODB_URL = process.env.MONGODB_URL;

  try {
    const connection = await mongoose
      .connect(MONGODB_URL)
      .then((res) => {
        console.log("MongoDB connected Successfully");
      })
      .catch((er) => {
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { db };
