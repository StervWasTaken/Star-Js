const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
    name: "lyrics",
    aliases: ["ly"],
    description: "Get lyrics for the currently playing song",
    async execute(client, message, args) {
      if(message.author.id == '755810994739085414') return message.channel.send(`You're not allowed to use this command sdasa`)
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is nothing playing.",message.channel).catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `No lyrics found for ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setAuthor(`${queue.songs[0].title} â€” Lyrics`, "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
      .setThumbnail(queue.songs[0].img)
      .setColor("YELLOW")
      .setDescription(lyrics)
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  },
};