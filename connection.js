const mongoose = require("mongoose");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config({ path: "./config/.env" });
}

async function connectToMongo() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("MongoDB is connected!");
    } catch (err) {
        console.error("Error: Not connected to Database", err.message);
    }
}

module.exports = { connectToMongo };
