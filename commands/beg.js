const profileModel = require('../models/profileSchema')
module.exports = {
    name: "beg",
    cooldown: 60,
    description: "Beg for coins",
    async execute(client, message, cmd, args, Discord, profileData){
        const randomNumber = Math.floor(Math.random() * 300) + 1;
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, {
            $inc: {
                starCoins: randomNumber,
            }
        });

        const embed = new Discord.MessageEmbed()
        .setTitle(`Beg command`)
        .setColor("RED")
        .setDescription(`A person gave you ${randomNumber} Star coins`)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp()
        return message.channel.send(embed)
    }
}