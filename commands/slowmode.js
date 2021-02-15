const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'slowmode',
    aliases: ['slowmo', 'slwmo'],
    description: 'Sets SlowMode for a Channel',
async execute(client, msg, args, cmd, Discord){
    const { member } = msg
if(!member.hasPermission('MANAGE_CHANNELS')){
    msg.channel.send(new Discord.MessageEmbed() .setDescription('You Cannot do that, Missing Permissions') .setColor('RED'))
    return;
}
const channel = msg.channel
    if (!args[0]) return msg.channel.send(new Discord.MessageEmbed() .setDescription('Invalid Args: What do you want the slowmode to be set to?') .setColor('RED'));
    if(args[0] == "off") {
        channel.setRateLimitPerUser(0)
        msg.channel.send(new Discord.MessageEmbed() .setDescription('Slow Mode turned off') .setColor('GREEN'))
        return;
    }
    if(isNaN(args[0])) return msg.channel.send(new Discord.MessageEmbed() .setDescription('Please type a real number!') .setColor('RED'));
    if (args[0] > 21600 || args[0] < 1) return msg.channel.send(new Discord.MessageEmbed() .setDescription('Number must be between 1 - 21600') .setColor('RED'))

        channel.setRateLimitPerUser(args[0])
        msg.channel.send(new Discord.MessageEmbed() .setDescription(`Slow Mode set to ${args[0]}`) .setColor('RED'))
        
    .catch((e) => {
        msg.channel.send('Error Occured!')
        e ? console.error(e) : console.log('Uknown Error')
    })
}
}