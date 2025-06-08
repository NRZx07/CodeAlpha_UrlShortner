const shortid = require("shortid");
const Url = require("../models/url");

async function generateShortId(req, res) {
  const { url } = req.body;  // destructuring for clarity

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortId = shortid.generate();

  try {
    await Url.create({
      shortId,
      redirectURL: url,   // use 'url' consistently here
      visitHistory: [],
    });
    return res.json({ id: shortId });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create short URL" });
  }
}

async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result =await Url.findOne({ shortId});
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  generateShortId,
  getAnalytics,
};
