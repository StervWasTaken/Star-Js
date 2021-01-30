module.exports = {
    name: 'leave',
    description: 'Leaves the channel',
    async execute(client,message, args) {
        const voiceChannel = message.member.voice.channel;
 
        if(!voiceChannel) return message.channel.send("You need to be in a voice channel to stop the music!");
        await voiceChannel.leave();
        await message.channel.send(`Leaving the voice channel`)
 
    }
}