const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    description: "Shows the help menu",
    async execute(client, message, cmd, args, Discord) {
        const newEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle("Help Menu")
        .setDescription("This is the help menu for the bot Star JS")
        .setThumbnail('https://cdn.discordapp.com/avatars/777630825491333121/0e3273b3ec43f910cc3d2310eaf4b4e7.webp')
        .addFields(
            {name: 'js!help', value: 'Shows this menu'},
            {name: 'js!add, js!addition', value: 'Adds 2 numbers'},
            {name: 'js!play', value: 'Fixing bugs'},
            {name: 'js!queue', value: 'Fixing Bugs'},
            {name: 'js!stop', value: 'Fixing Bugs'},
            {name: 'js!user-info', value: 'Shows the info a person'},
            {name: 'js!serverInfo', value: 'Coming soon...'},
            {name: 'js!weather', value: 'Shows the weather of a place'},
            {name: 'js!embed', value: 'Makes an embed'},
            {name: 'js!avatar', value: 'Shows someone`s avatar'},
            {name: 'js!image', value: 'Searches an image from google'},
            {name: 'js!mcserver', value: 'Shows the status of a minecraft server'},
            {name: 'js!bug', value: 'Reports a bug'},
            {name: 'js!ticket', value: 'Creates a ticket to contact staff'},
            {name: 'js!suggest', value: 'Puts a suggestion'},

        )
        .setFooter('Bot coded by Sterv#4436')
        .setTimestamp()

        message.channel.send(newEmbed);
    }
}