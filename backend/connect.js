const mongoose = require('mongoose');

async function connect(url) {
  try {
    await mongoose.connect(url, {
 
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

module.exports = { connect };
