const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "loop",
    aliases: ["l"],
    description: "Toggle music loop",
    async execute(client, message,  cmd, args) {
        if(message.author.id == '755810994739085414') return message.channel.send(`You're not allowed to use this command sdasa`)
    const serverQueue = message.client.queue.get(message.guild.id);
       if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return message.channel.send({
                embed: {
                    color: "GREEN",
                    description: `ðŸ”  **|**  Loop is **\`${serverQueue.loop === true ? "enabled" : "disabled"}\`**`
                }
            });
        };
    return message.channel.send("There is nothing playing in this server.", message.channel);
  },
};