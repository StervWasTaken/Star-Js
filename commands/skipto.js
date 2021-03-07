const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skipto",
    aliases: ["st"],
    description: "Skip to the selected queue number",
    aliases: ["st"],
    async execute(client, message, args) {

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is no queue.",message.channel).catch(console.error);
    if (args[0] > queue.songs.length)
      return message.channel.send(`The queue is only ${queue.songs.length} songs long!`,message.channel).catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }
     try{
    queue.connection.dispatcher.end();
      }catch (error) {
        queue.voiceChannel.leave()
        message.client.queue.delete(message.guild.id);
       return message.channel.send(`:notes: The player has stopped and the queue has been cleared.: ${error}`, message.channel);
      }
    
    queue.textChannel.send({
                        embed: {
                            color: "GREEN",
                            description: `${message.author} :thumbsup,­ skipped \`${args[0] - 1}\` songs`
                        }
   
                   }).catch(console.error);

  },
};