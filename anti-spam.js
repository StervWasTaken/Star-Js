module.exports = async (client) => {
    
    let spam = 0 // define the spam level

client.on('message', message => {
    if(message.author.bot) return // ignores bots
    if(spam > 10) { // checks if spam level is exceeded (10), you can change this number
        message.channel.bulkDelete(15) // bulk deletes 15 messages so it'll clear the spam
        return message.channel.send(`${message.author}, you are sending messages too quickly! Continuing will result in a mute!`).then(message => message.delete({timeout: 10000})) // warns them
    } else { // if that is not the case, 
        spam++ // increase the spam level everytime a message is sent 
    }
})

setInterval(() => {
    if(spam > 0) { 
        spam-- // decreases the spam level every 10 seconds 
    }
}, 1000)}