const image_api = require('anime-images-api');
const api = new image_api('GET')


module.exports = {
    name: 'punch',
    description: 'Gets punch image',
    async execute(client, message, cmd, args){
    api.getPunchImage().then(res => {
        message.channel.send(res.image)
    })
    }
}