module.exports = {
    name: "say",
    description: "Says a thing",
    async execute(client, message, cmd, args, Discord){

        if(!args[0]){
            message.channel.send(`Please put an argument`)
        }

        message.channel.send(args[0], args[1], args[2], args[3])
        console.log(`Sent the message!`)
    }
}