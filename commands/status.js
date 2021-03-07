module.exports = {
    name: 'status',
    cooldown: 0,
    description: 'Sets the status of the bot',
    async execute(client, message, cmd, args, Discord){

        if(message.author.id !== '743453469947592746') return message.reply(`You do not have the permission to run this command!`);

        const content = message.content.replace(`js!status ${args[0]}`, '')

        client.user.setPresence({
            activity: {
                name: content,
                type: args[0]
            }
        })
        message.channel.send(`Set the bot's status!`)
    }}
