const express = require("express");
const { handleGetRedirectUrl } = require("../controllers/url");


const router = express.Router();

// Routes
router.get('/:shortId', handleGetRedirectUrl);
// router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;