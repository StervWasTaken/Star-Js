module.exports = {
    name: 'user-info',
    description: "Embeds!",
    execute(client, message, args, Discord) {
 
 
 
          const { guild, channel } = message
          const user = message.mentions.users.first() || message.member.user
          const member = guild.members.cache.get(user.id)
          const newEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(`User info for ${user.username}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
              {
                name: 'User tag',
                value: user.tag,
                inline: true,
              },
              {
                name: 'Is bot',
                value: user.bot,
                inline: true,
              },
              {
                name: 'Nickname',
                value: member.nickname || 'None',
                inline: true,
              },
              {
                name: 'Joined Server',
                value: new Date(member.joinedTimestamp).toLocaleDateString(),
                inline: true,
              },
              {
                name: 'Account Created',
                value: new Date(user.createdTimestamp).toLocaleDateString(),
                inline: true,
              },
              {
                name: 'Roles',
                value: member.roles.cache.size - 1,
                inline: true,
              }
            )
            .setFooter("Requested by " + message.author.username)
 
          message.channel.send(newEmbed)
      }
      }
    
