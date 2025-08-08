const mongoose = require("mongoose");

const connectDB = async (url) => {
  try {
    const conn = await mongoose.connect(url);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error Connection: ${error.message}`);
    process.exit(1); //failure, 0 for success
  }
};
module.exports = connectDB;
