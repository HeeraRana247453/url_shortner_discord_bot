const express = require("express");
const urlRoute = require("./routes/url");
const { connectToMongo } = require("./connection");
const { handleCreateNewShortURL } = require('./controllers/url');

if(process.env.NODE_ENV !== "production"){
    require("dotenv").config({path:"./config/.env"});
  }

const app = express();
const PORT = process.env.PORT;

// Connect to DB
connectToMongo();
// ROUTES
app.use("/url", urlRoute);
app.listen(PORT, () => console.log(`Server is running at Port: ${PORT}`));



// ============================================================================
// DISCORD DEVELOPER APP = DISCORD BOT
// ============================================================================
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { botCommandHandler } = require("./controllers/commandHandler");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });//guildmessages can create,update,delete messsages

client.on("messageCreate", (message) => {
    console.log("Author: ", message.author.username, "\nMessage: ", message.content, "\nChannel: ", message.channel.name, "\n");

    if (message.author.bot) 
        return;
    else if (message.content.startsWith("create")) {
        const replyShortUrl = handleCreateNewShortURL(message,PORT);
        return replyShortUrl;
    }
    else
        message.reply({ content: "Hi from bot" });
});

// Handle Commands
client.on(Events.InteractionCreate, botCommandHandler);

client.login(process.env.DISCORD_BOT_CLIENT_ID);