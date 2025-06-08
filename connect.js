const mongoose = require('mongoose');

async function connect(url) {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);  // Exit if connection fails
  }
}

module.exports = { connect };
