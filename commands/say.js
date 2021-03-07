const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'say',
    description: 'make the bot say whatever you said',
    alaises: ['bc', 'broadcast'],
    args: true,
    execute(client, message, cmd, args, Discord) {
    message.delete()
    const embed = new MessageEmbed()
    .setTitle('Say')
    .setDescription(args.join(" ")) 
    .setFooter(`Requested by ${message.author.username}`)
    .setTimestamp()
    console.log(`${message.author.username}`)
    message.channel.send(embed)
    },
   }