const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    aliases: ["q", "list", "songlist", "song-list"],
    description: "To show the server songs queue",
    async execute(client, message, args) {
      if(message.author.id == '755810994739085414') return message.channel.send(`You're not allowed to use this command sdasa`)

 
  const permissions = message.channel.permissionsFor(message.client.user);
    if (!permissions.has(["SEND_MESSAGES"]))
      return message.channel.send("Missing permission to manage messages or add reactions",message.channel);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is nothing playing in this server.",message.channel)

    let currentPage = 0;
    const embeds = generateQueueEmbed(message, queue.songs);

    const queueEmbed = await message.channel.send(
      `**\`${currentPage + 1}\`**/**${embeds.length}**`,
      embeds[currentPage]
    );

    try {

    } catch (error) {
      console.error(error);
      message.channel.send(error.message).catch(console.error);
    }

    const filter = (reaction, user) =>
      ["â¬…ï¸", "ðŸ›‘", "âž¡ï¸"].includes(reaction.emoji.name) && message.author.id === user.id;
    const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

    collector.on("collect", async (reaction, user) => {
      try {
        if (reaction.emoji.name === "âž¡ï¸") {
          if (currentPage < embeds.length - 1) {
            currentPage++;
            queueEmbed.edit(`**\`${currentPage + 1}\`**/**${embeds.length}**`, embeds[currentPage]);
          }
        } else if (reaction.emoji.name === "â¬…ï¸") {
          if (currentPage !== 0) {
            --currentPage;
            queueEmbed.edit(`**\`${currentPage + 1}\`**/**${embeds.length}**`, embeds[currentPage]);
          }
        } else {
          collector.stop();
          reaction.message.reactions.removeAll();
        }
        await reaction.users.remove(message.author.id);
      } catch (error) {
        console.error(error);
        return message.channel.send(error.message).catch(console.error);
      }
    });
  }
};

function generateQueueEmbed(message, queue) {
  let embeds = [];
  let k = 10;

  for (let i = 0; i < queue.length; i += 10) {
    const current = queue.slice(i, k);
    let j = i;
    k += 10;

    const info = current.map((track) => `**\`${++j}\`** | [\`${track.title}\`](${track.url})`).join("\n");
  
    const serverQueue =message.client.queue.get(message.guild.id);
    const embed = new MessageEmbed()
     .setAuthor("Server Songs Queue", "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/Music.gif")
    .setThumbnail(message.guild.iconURL())
    .setColor("BLUE")
    .setDescription(`${info}`)
    .addField("Now Playing", `[${queue[0].title}](${queue[0].url})`, true)
    .addField("Text Channel", serverQueue.textChannel, true)
    .addField("Voice Channel", serverQueue.voiceChannel, true)
    .setFooter("Currently Server Volume is "+serverQueue.volume)
     if(serverQueue.songs.length === 1)embed.setDescription(`No songs to play next add songs by \`\`js!play <song_name>\`\``)

    embeds.push(embed);
  }

  return embeds;
 
};