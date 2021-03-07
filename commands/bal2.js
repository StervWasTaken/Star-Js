const profileModel = require('../models/profileSchema')

module.exports = {
    name: "bal2",
    description: "Checks the user's balance",
    async execute(client, message, cmd, args, Discord, profileData){
        const target = message.mentions.users.first

        try{
            const targetData = await profileModel.findOne()
            if(!targetData) return message.channel.send(`That user does not exist in the database`)

            await profileModel.findOne({
                userID: target.id,
                starCoins: target.starCoins
            })
            return message.channel.send(`${target} has ${target.starCoins} Star Coins`)
        }catch(err){
            console.log(err)
        }
    }
}