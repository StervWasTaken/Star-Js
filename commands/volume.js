const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "volume",
    description: "To change the server song queue volume",
    usage: "[volume]",
    aliases: ["v", "vol"],
    async execute(client, message, cmd, args, Discord) {
    const channel = message.member.voice.channel;
    if (!channel)return message.channel.send("I'm sorry but you need to be in a voice channel to change the volume!", message.channel);
    //if(!message.member.)
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue) return message.channel.send("There is nothing playing in this server.", message.channel);
    if (!serverQueue.connection) return message.channel.send("There is nothing playing in this server.", message.channel);
    if (!args[0])return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
     if(isNaN(args[0])) return message.channel.send(':notes: Numbers only!').catch(err => console.log(err));
    if(parseInt(args[0]) > 150 ||(args[0]) < 0) return message.channel.send('You can\'t set the volume more than 150. or lower than 0',message.channel).catch(err => console.log(err));
    serverQueue.volume = args[0]; 
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    let xd = new MessageEmbed()
    .setDescription(`I set the volume to: **${args[0]/1}/100**`)
    .setAuthor("Server Volume Manager", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setColor("BLUE")
    return message.channel.send(xd);
  },
};