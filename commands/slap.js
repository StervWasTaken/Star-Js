const image_api = require('anime-images-api');
const api = new image_api('GET')


module.exports = {
    name: 'slap',
    description: 'Gets slap image',
    async execute(client, message, cmd, args){
    api.getSlapImage().then(res => {
        message.channel.send(res.image)
    })
    }
}