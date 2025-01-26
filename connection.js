const mongoose = require("mongoose");

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config({path:"./config/.env"});
}


async function connectToMongo(){
    return mongoose.connect(process.env.DB_URL)
            .then(()=>console.log(`MongoDB is connected!`))
            .catch((err)=>console.log("Error: Not connected to Database",err))
}

module.exports = {connectToMongo};