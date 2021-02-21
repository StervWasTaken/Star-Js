const profileModel = require('../../models/profileSchema')

module.exports = async(client, discord, member) => {
    let profile =  await profileModel.create({
        userID: member.id,
        serverID: member.guild.id,
        starCoins: 1000,
        bank: 0
    });
    profile.save();
}