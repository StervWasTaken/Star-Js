module.exports = {
    commands: ['giverole', 'addrole'],
    minArgs: 2,
    expectedArgs: "<Target user's @> <The role name>",
    permissions: 'MANAGE_ROLES',
    permissionsError: 'You do not the permission to use this command',
    callback: (message, arguments) => {
      const targetUser = message.mentions.users.first()
      if (!targetUser) {
        message.reply('Please mention someone to give a role to')
        return
      }
  
      arguments.shift()
  
      const roleName = arguments.join(' ')
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