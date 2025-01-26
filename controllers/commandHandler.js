

const botCommandHandler =  async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const { commandName } = interaction;
    switch (commandName) {
        case 'ping':
            await interaction.reply({ content: 'Pong Pong!' });
            break;
        case 'help':
            await interaction.reply({ content: 'Help!' });
            break;
        default:
            await interaction.reply({ content: 'Unknown command' });
    }
}

module.exports = {botCommandHandler}