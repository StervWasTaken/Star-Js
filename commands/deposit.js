const profileModel = require('../models/profileSchema')
module.exports = {
    name: 'deposit',
    aliases: ['dep'],
    description: 'Deposits coins',
    async execute(client, message, cmd, args, Discord, profileData){
        const amount = args[0]
        if(amount % 1 != 0 || amount <= 0) return message.channel.send(`Deposit amount must be a whole number`)
        try{
            if(amount > profileData.starCoins) return message.channel.send(`You don't have that amount of coins to deposit`)
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $inc: {
                    starCoins: -amount, 
                    bank: amount,
                }
            })

            const embed = new Discord.MessageEmbed()
            .setTitle(`Deposit`)
            .setColor("RED")
            .setDescription(`You deposited ${amount} of coins into your bank`)
            .setFooter(`Requested by ${message.author.username}`)
            .setTimestamp()

            return message.channel.send(embed)
        }catch (err){
            console.log(err)
        }
    }
}