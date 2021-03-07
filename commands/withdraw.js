const profileModel = require('../models/profileSchema')

module.exports = {
    name: 'withdraw',
    aliases: ['with'],
    description: 'Withdraws money from your bank',
    async execute(client, message, cmd, args, Discord, profileData){
        const amount = args[0]
        if(amount % 1 != 0 || amount <= 0) return message.channel.send(`Withdraw amount must be a whole number`)
        try{
            if(amount > profileData.bank) return message.channel.send(`You don't have that amount of coins to withdraw`)
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $inc: {
                    starCoins: amount, 
                    bank: -amount,
                }
            })

            const embed = new Discord.MessageEmbed()
            .setTitle(`Deposit`)
            .setColor("RED")
            .setDescription(`You withdrawn ${amount} of coins into your wallet`)
            .setFooter(`Requested by ${message.author.username}`)
            .setTimestamp()

            return message.channel.send(embed)
        }catch (err){
            console.log(err)
        }
    }
}