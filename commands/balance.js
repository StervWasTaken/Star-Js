module.exports = {
    name: "balance",
    aliases: ['bal'],
    description: "Checks the user's balance",
    execute(client, message, cmd, args, Discord, profileData){
        message.channel.send(`Your balance is ${profileData.starCoins}, your bank balance is ${profileData.bank}`)
        const mention = message.mentions.users.first()
        if (mention){
            message.channel.send(`They have ${mention.profileData.starCoins}`)
        }else { 
          message.channel.send(`You have ${profileData.starCoins}`)
         }
         if(!profileData){
            message.channel.send('That user does not have a profile yet')
        }
    }
}