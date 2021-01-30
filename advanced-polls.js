const channels = ['784847609981435954', '757457602140569621', '793814264850284554', '779625602747334667']

module.exports = (client) => {
  client.on('message', (message) => {
    const { channel, content } = message

    if (!channels.includes(channel.id)) {
      return
    }

    const eachLine = content.split('\n')

    for (const line of eachLine) {
      if (line.includes('=')) {
        const split = line.split('=')
        const emoji = split[0].trim()
        message.react(emoji)
      }
    }
  })
}