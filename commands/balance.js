module.exports = {
    name: "balance",
    aliases: ['bal'],
    description: "Checks the user's balance",
    execute(client, message, cmd, args, Discord, profileData){
        const embed = new Discord.MessageEmbed()
        .setTitle(`Balance for ${message.author.username}`)
        .setColor("RED")

        .addFields(
            {name: 'Wallet',
            value: profileData.starCoins
        },{
            name: 'Bank',
            value: profileData.bank
        }
        )
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp()
        message.channel.send(embed)
    }
}