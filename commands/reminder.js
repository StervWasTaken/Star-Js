const remind = require('../commands/remind');
const ms = require('ms');

module.exports = {
    name: 'reminder',
    description: 'Shows all reminders',
    async execute(client, message, cmd, args, Discord){
        const reminderembed = new Discord.MessageEmbed()
        .setTitle(`Reminders for ${message.author.username}`)
        .setColor("RED")
        .setDescription(remind)
        message.channel.send(reminderembed)
    }
}