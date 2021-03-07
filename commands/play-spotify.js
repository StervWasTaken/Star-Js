const ytdl = require('ytdl-core')
const ytSearch = require('yt-search')
const { getData, getPreview } = require('spotify-url-info');
const { query } = require('minecraft-server-util');

var parsed, uri;

const queue = new Map()

module.exports = {
    name: 'play-spotify',
    description: 'Plays a song from spotify',
    async execute(client, message, cmd, args, Discord){
        const voiceChannel = message.member.voice.channel
        if(!voiceChannel) return message.reply('You need to be in a voice channel to use this command')

        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT') || !permissions.has('SPEAK'))
        return message.reply(`You do not have the correct permissions to use this command`);


        if(!args.length) return message.reply('You need to specify what song you want to play')
        let song = {}

        if(ytdl.validateURL(args[0])){
            const songInfo = await ytdl.getInfo(args[0])
            song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url };
        } else if (args[0].includes('spotify')){
            const spotifyTrackInfo = await getPreview(args[0])

            const videoFinder = async (query) => {
                const videoResult = await ytSearch(query)
                return videoResult.videos.length > 1 ? videoResult.videos[0] : null
            }

            const video = await videoFinder(`${spotifyTrackInfo.title} ${spotifyTrackInfo.artist}`)

            if(video){
                song  = { title: video.title, url: video.url }
            } else {
                message.reply(`Error finding thw song`)
            }
        }else {
            const videoFinder = async (query) => {
                const videoResult = await ytSearch(query)
                return videoResult.videos.length > 1 ? videoResult[0] : null 
            }
            const video = await videoFinder(args.join(' '))

            if(video){
                song = { title: video.title, url: video.url }
            }else {
                message.reply(`Error finding the song`)
            }
        }

        console.log(`Playing the song`)
    }
}