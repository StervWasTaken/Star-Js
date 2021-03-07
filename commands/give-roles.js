module.exports = {
    name: 'addrole',
    aliases: ['giverole'],
    async execute(client, message, cmd, args, Discord){
      const targetUser = message.mentions.users.first()
      if (!targetUser) {
        message.reply('Please mention someone to give a role to')
        return
      }
  
      args.shift()
  
      const roleName = args.join(' ')
      const { guild } = message
  
      const role = guild.roles.cache.find((role) => {
        return role.name === roleName
      })
      if (!role) {
        message.reply(`There is no role with the name "${roleName}"`)
        return
      }
  
      const member = guild.members.cache.get(targetUser.id)
      member.roles.add(role)
  
      message.reply(`that user now has the "${roleName}" role`)
    },
  }