const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "work-help",
    description: "Shows the help menu",
    async execute(client, message, cmd, args, Discord) {
        const newEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle("Work Help Menu")
        .setDescription("This is the economy command help menu for Star Js")
        .setThumbnail('https://cdn.discordapp.com/avatars/777630825491333121/0e3273b3ec43f910cc3d2310eaf4b4e7.webp')
        .addFields(
            {name: 'js!bal', value: 'Shows your Star Coins balance'},
            {name: 'js!beg', value: 'Begs for Star Coins'},
            
        )
        .setFooter('Bot coded by Sterv#4436')
        .setTimestamp()

        message.channel.send(newEmbed);
    }
}