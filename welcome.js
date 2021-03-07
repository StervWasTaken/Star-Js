module.exports = client => {
    const channelId = '769643161336676388' // welcome channel
    const targetChannelId = '803872283658813450' // rules
    
     client.on('guildMemberAdd', (member) => {
         console.log(member)
    
         const message = `Welcome <@${member.id}> to StarCraft! Please check out ${member.guild.channels.cache.get(targetChannelId).toString()}`
    
         const channel = member.guild.channels.cache.get(channelId)
         channel.send(message)
     })   
    }