const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "admin",
    aliases: ['adminhelp'],
    description: "Shows the admin help menu",
    async execute(client, message, cmd, args, Discord) {
        let newEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle("Admin Help Menu")
        .setDescription("This is the admin commands help menu for the bot Star JS")
        .setThumbnail('https://cdn.discordapp.com/avatars/777630825491333121/0e3273b3ec43f910cc3d2310eaf4b4e7.webp')
        .addFields(
            {name: 'js!admin', value: 'Shows this menu'},
            {name: 'js!kick', value: 'Kicks a member'},
            {name: 'js!clear', value: 'Clears a number of messages'},
            {name: 'js!ban', value: 'Coming soon...'},
            {name: 'js!unban', value: 'Coming soon...'},
            {name: 'js!mute', value: 'Mutes a member'},
            {name: 'js!unmute', value: 'Unmutes a member'},
            {name: 'js!addrole', value: 'Adds a role to a user'},
            {name: 'js!delrole', value: 'Removes a role from a user'},
            {name: 'js!slowmode', value: 'Sets the slowmode for a channel'},
        )
        .setFooter('Bot coded by Sterv#4436')
        .setTimestamp()

        message.channel.send(newEmbed);
    }
}