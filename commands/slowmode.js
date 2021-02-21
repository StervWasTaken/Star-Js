const Discord = require('discord.js');
module.exports = {
    name: 'slowmode',
    description: 'Sets SlowMode for a Channel',
async execute(client, message, cmd, args){

    const { member } = message
    if (!message.member.hasPermission("MANAGE_CHANNELS")){
        messages.channel.send(new Discord.MessageEmbed() .setDescription('You Cannot do that, Missing Permissions') .setColor('RED'))
        return;
    }

    const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1]) || message.channel
    if (!args[0]) return message.channel.send(new Discord.MessageEmbed() .setDescription('Invalid Args: What do you want the slowmode to be set to?') .setColor('RED'));
    if(args[0] == "off") {
        channel.setRateLimitPerUser(0)
        message.channel.send(new Discord.MessageEmbed() .setDescription('Slow Mode turned off') .setColor('GREEN'))
        return;
    }

    if (!args[0]) return message.channel.send(new Discord.MessageEmbed() .setDescription('Invalid Args: What do you want the slowmode to be set to?') .setColor('RED'));
    if(isNaN(args[0])) return message.channel.send(new Discord.MessageEmbed() .setDescription('Please type a real number!') .setColor('RED'));
    if (args[0] > 21600 || args[0] < 1) return message.channel.send(new Discord.MessageEmbed() .setDescription('Number must be between 1 - 21600') .setColor('RED'))


        channel.setRateLimitPerUser(args[0])
        message.channel.send(new Discord.MessageEmbed() .setDescription(`Slow Mode set to ${args[0]}`) .setColor('RED'))
        return;

 
}}