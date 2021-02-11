module.exports = async (client) =>{
    const guild = client.guilds.cache.get('764920308846035014');
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('807155804524118047');
        channel.setName(`Total Members ${memberCount.toLocaleString()}`)
        console.log('Updating the Member Count');
    }, 5000);
}