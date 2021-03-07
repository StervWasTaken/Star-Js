module.exports = {
    name: 'status-off',
    cooldown: 0,
    description: 'Removes the status of the bot',
    async execute(client, message, cmd, args, Discord){
        if(message.author.id !== '743453469947592746') return message.reply(`You do not have the permission to run this command!`);

        const content = message.content.replace('js!status ', '')

        client.user.setPresence({
            activity: {
                name: " ",
                type: " "
            }
        })
        message.channel.send(`Removed the bot's status!`)
    }
}