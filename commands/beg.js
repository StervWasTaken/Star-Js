const profileModel = require('../models/profileSchema')
module.exports = {
    name: "beg",
    description: "Beg for coins",
    cooldown: 60,
    async execute(client, message, cmd, args, Discord, profileData){
        const randomNumber = Math.floor(Math.random() * 300) + 1;
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        }, {
            $inc: {
                starCoins: randomNumber,
            }
        });
        return message.channel.send(`A random person gave you ${randomNumber} Star Coins`)
    }
}