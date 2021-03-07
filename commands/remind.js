const ms = require('ms');

module.exports = {
    name: 'remind',
    cooldown: 0,
    description: 'Sets a reminder',
    async execute(client, message, cmd, args, Discord){
        let time = args[0]
        let user = message.author
        let reminder = args.splice(1).join(' ')

        const notime = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Please specify the time**`)

        const wrongtime = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Sorry I only do d, m, h, or s**`)

        const reminderembed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Please tell me what to remind you`)

        if(!args[0]) return message.channel.send(wrongtime)

        if(
            !args[0].endsWith("d") &&
            !args[0].endsWith("m") &&
            !args[0].endsWith("h") &&
            !args[0].endsWith("s")
        )

        return message.channel.send(wrongtime)
    if(!reminder) return message.channel.send(reminderembed)

    const remindertime = new Discord.MessageEmbed()
    .setColor("GREEN")
    .setDescription(`\**Your reminder will go off in ${time}**`)

        message.channel.send(remindertime)

        const reminderdm = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setTitle(`**REMINDER**`)
        .setDescription(`**It has been ${time} here is your reminder:** ${reminder}`)

        setTimeout(async function () {
            try{

                await user.send(reminderdm)
            }catch (err) { 
                console.log(err)
            }
        }, ms(time))
    }
}