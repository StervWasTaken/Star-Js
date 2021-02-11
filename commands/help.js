const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "help",
    description: "Shows the help menu",
    async execute(client, message, args) {
        const newEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle("Help Menu")
        .setDescription("This is the help menu for the bot Star JS")
        .addFields(
            {name: 'js!help', value: 'Shows this menu'},
            {name: 'js!add, js!addition', value: 'Adds 2 numbers'},
            {name: 'js!play', value: 'Plays music from the internet(for a specific video do js!play "your url here"'},
            {name: 'js!leave', value: 'Leaves a voice channel'},
            {name: 'js!queue', value: 'Coming soon...'},
            {name: 'js!addqueue', value: 'Coming soon...'},
            {name: 'js!user-info', value: 'Shows the info a person'},
            {name: 'js!serverInfo', value: 'Coming soon...'},
            {name: 'js!weather', value: 'Shows the weather of a place'},
            {name: 'js!embed', value: 'Makes an embed'},
            {name: 'js!avatar', value: 'Shows someone`s avatar'},
            {name: 'js!image', value: 'Searches an image from google'},
            {name: 'js!mcserver', value: 'Shows the status of a minecraft server'},

        )
        .setFooter('Bot coded by Sterv#4436')
        .setTimestamp()

        message.channel.send(newEmbed);
    }
}