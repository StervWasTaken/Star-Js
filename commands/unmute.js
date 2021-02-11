module.exports = {
    name: 'unmute',
    description: "This unmutes a member",
    permission: 'MANAGE_ROLES',
    execute(client, message, args){
        const target = message.mentions.users.first();
        if(target){
            let mainRole = message.guild.roles.cache.find(role => role.name === 'Member');
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
 
            let memberTarget= message.guild.members.cache.get(target.id);
 
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);
            message.channel.send(`<@${memberTarget.user.id}> has been unmuted`);
        } else{
            message.channel.send('Cant find that member!');
        }

        if(!message.member.hasPermission('MANAGE_ROLES')){
            message.channel.send('You do not have the permission required to use this command')
        }
    }
}