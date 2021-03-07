const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "resume",
    description: "To resume the paused music",
    async execute(client, message, args) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      let xd = new MessageEmbed()
      .setDescription(":thumbsup:, Resumed the music for you!")
      .setColor("YELLOW")
      .setAuthor("Music has been Resumed!", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      return message.channel.send(xd);
    }
    return message.channel.send("There is nothing playing in this server.", message.channel);
  },
};