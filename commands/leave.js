module.exports = {
    name: 'leave',
    description: 'stop the bot and leave the channel',
    async execute(client, message, cmd, args, Discord) {
        const voiceChannel = message.member.voice.channel;
        if(message.author.id == '755810994739085414') return message.channel.send(`You're not allowed to use this command sdasa`)

 
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to stop the music!");
        await voiceChannel.leave();
        await message.channel.send(`Leaving the voice channel`)
 
    }
}