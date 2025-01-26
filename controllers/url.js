const shortid = require("short-id");
const URL = require("../models/url");


// Create Short URL
const handleCreateNewShortURL = async (message,PORT) => {
    const url = message.content.split("create ")[1];
    if (!url) return message.reply({ content: "URL is required" });

    //create short-url
    const shortId = shortid.generate();//it will generate the shortid
    await URL.create({
        shortId: shortId,
        redirectURL: url,
        visitHistory: []
    });
    const reply = message.reply({ content: "Generated Short-url: " + `https://shorturl-iirl.onrender.com/url/${shortId}`});
    return reply;
}

// Redirect to Main URL after timestamp
const handleGetRedirectUrl = async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId }, {
        $push: {
            visitHistory: { timestamp: Date.now() }
        }
    });

    res.redirect(entry.redirectURL);
}

// Get Analytics
const handleGetAnalytics = async (req,res)=>{
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});

    res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}

module.exports = { handleCreateNewShortURL, handleGetRedirectUrl, handleGetAnalytics};