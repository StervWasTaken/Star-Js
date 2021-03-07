const profileModel = require('../models/profileSchema')

module.exports = {
    name: 'add-coins',
    description: 'Adds Star Coins for a user',
    async execute(client, message, cmd, args, Discord, profileData){
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`You can't run this command`)
        if(!args.length) return message.channel.send(`You need to mention someone`)
        const amount = args[1]
        const target = message.mentions.users.first()
        if(!target) return message.channel.send(`That user does not exist`)
        if(amount % 1 != 0 || amount <= 0) return message.channel.send(`Withdraw amount must be a whole number`)

        try{
            const targetData = await profileModel.findOne({ userID: target.id})
            if(!targetData) return message.channel.send(`That user does not exist in the database`)

            await profileModel.findOneAndUpdate({
                userID: target.id
            },{
                $inc: {
                    starCoins: amount
                }
            })

            const embed = new Discord.MessageEmbed()
            .setTitle(`Deposit`)
            .setColor("RED")
            .setDescription(`You given ${amount} of coins to that user!`)
            .setFooter(`Requested by ${message.author.username}`)
            .setTimestamp()

            return message.channel.send(embed)
        }catch(err){
            console.log(err)
        }
    }
}