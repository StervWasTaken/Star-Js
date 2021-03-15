const prefix = "js!"

const Tags = require('../app')
module.exports ={
    name: 'Tags', 
    aliases: ['addtag', 'tag', 'edittag'],
    description: 'adds a tag',

    async execute(client, message, cmd, args, Discord){


if (message.content.startsWith(prefix)) {
    const input = message.content.slice(prefix.length).trim().split(' ');
    const command = input.shift();
    const commandArgs = input.join(' ');

    if (command === 'addtag') {
        const splitArgs = commandArgs.split(' ');
        const tagName = splitArgs.shift();
        const tagDescription = splitArgs.join(' ');

        try {
            // equivalent to: INSERT INTO tags (name, descrption, username) values (?, ?, ?);
            const tag = await Tags.create({
                name: tagName,
                description: tagDescription,
                username: message.author.username,
            });
            return message.reply(`Tag ${tag.name} added.`);
        } catch (e) {
            if (e.name === 'SequelizeUniqueConstraintError') {
                return message.reply('That tag already exists.');
            }
            return message.reply('Something went wrong with adding a tag.');
        }
    } else if (command === 'tag') {
        const tagName = commandArgs;

        // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
        const tag = await Tags.findOne({ where: { name: tagName } });
        if (tag) {
            // equivalent to: UPDATE tags SET usage_count = usage_count + 1 WHERE name = 'tagName';
            tag.increment('usage_count');
            return message.channel.send(tag.get('description'));
        }
        return message.reply(`Could not find tag: ${tagName}`);
    } else if (command === 'edittag') {
        const splitArgs = commandArgs.split(' ');
        const tagName = splitArgs.shift();
        const tagDescription = splitArgs.join(' ');

        // equivalent to: UPDATE tags (descrption) values (?) WHERE name = ?;
        const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });
        if (affectedRows > 0) {
            return message.reply(`Tag ${tagName} was edited.`);
        }
        return message.reply(`Could not find a tag with name ${tagName}.`);
    } else if (command === 'taginfo') {
        const tagName = commandArgs;

        // equivalent to: SELECT * FROM tags WHERE name = 'tagName' LIMIT 1;
        const tag = await Tags.findOne({ where: { name: tagName } });
        if (tag) {
            return message.channel.send(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`);
        }
        return message.reply(`Could not find tag: ${tagName}`);
    } else if (command === 'showtags') {
        // equivalent to: SELECT name FROM tags;
        const tagList = await Tags.findAll({ attributes: ['name'] });
        const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';
        return message.channel.send(`List of tags: ${tagString}`);
    } else if (command === 'removetag') {
        // equivalent to: DELETE from tags WHERE name = ?;
        const tagName = commandArgs;
        const rowCount = await Tags.destroy({ where: { name: tagName } });
        if (!rowCount) return message.reply('That tag did not exist.');

        return message.reply('Tag deleted.');
    }
}
}}