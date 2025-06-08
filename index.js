require('dotenv').config(); // Load .env variables at the very top

const express = require('express');
const cors = require('cors');
const urlRoute = require('./routes/url');
const { connect } = require('./connect');
const app = express();
const UrlModel = require('./models/url');
const port = process.env.PORT || 8001;  // Use PORT from .env or fallback

// Use MONGO_URI from .env instead of localhost
connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors()); // allow all origins for testing
app.use(express.json());

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await UrlModel.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    },
    { new: true }
  );

  if (!entry) {
    return res.status(404).json({ error: "Short URL not found" });
  }

  res.redirect(entry.redirectURL);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
