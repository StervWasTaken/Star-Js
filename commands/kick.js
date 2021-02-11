module.exports = {
    name: 'kick',
    description: "This command kicks a member!",
    permission: "KICK_MEMBERS",
    execute(client, message, args){

        const target = message.mentions.users.first();

        if(target){
            const memberTarget = message.guild.members.cache.get(target.id);

            if(memberTarget.hasPermission('ADMINISTRATOR')){
                message.channel.send(`You couldn't kick that member`)
            }else{ memberTarget.kick();
                message.channel.send("User has been kicked");
            }}else{
            message.channel.send(`You coudn't kick that member!`);
        }
        if(!message.member.hasPermission("KICK_MEMBERS")) {
            message.channel.send("You do not have the permission required to use this command")
        }
    }
}