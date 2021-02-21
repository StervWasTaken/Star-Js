const path =require('path')
const fs = require('fs');
const Discord = require('discord.js');
require('dotenv').config();
const Sequelize = require('sequelize');
const client = new Discord.Client();
const welcome =require('./welcome');
const command = require('./command');
const roleClaim = require('./role-claim');
const poll = require('./poll');
const advancedPolls = require('./advanced-polls');
const memberCount =require('./counters/member-counter')
const antiSpam =require("./anti-spam")
const { badwords } = require("./data.json")
const mongoose = require('mongoose')
const { prefix, bot_age, words_array, bot_info, } =require('./Config.json');

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
['command_handler', 'event_handler'].forEach(handler => {
  require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect(process.env.MONGODB_SRV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => {
  console.log(`Connected to the Database`)
}).catch((err) => {
  console.log(err)
})

client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	// SQLite only
	storage: 'database.sqlite',
});

const Tags = sequelize.define('tags', {
	name: {
		type: Sequelize.STRING,
		unique: true,
	},
	description: Sequelize.TEXT,
	username: Sequelize.STRING,
	usage_count: {
		type: Sequelize.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
});

client.on('message', async message => {
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
});
 

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  welcome(client)
  roleClaim(client)
  poll(client)
  advancedPolls(client)
  memberCount(client)
  antiSpam(client)

  Tags.sync();

  const baseFile = 'command-base.js'
  const commandBase = require(`./commands/${baseFile}`)

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file))
        commandBase(client, option)
      }
    }
  }

  readCommands('commands')
});

client.on('guildMemberAdd', guildMember =>{
  let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');

  guildMember.roles.add(welcomeRole);
});

client.on('message', message => {
  if(message.content.includes(badwords)){
    console.log(badwords)
  }
})
const clean = text => {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
  }

client.on("message", message => {
    const args = message.content.split(" ").slice(1);
  
    if (message.content.startsWith("eval")) {
      if(message.author.id !== "743453469947592746") return message.reply('**I thou shall not let thee run your code in me**');
      try {
        const code = args.join(" ");
        let evaled = eval(code);
  
        if (typeof evaled !== "string")
          evaled = require("util").inspect(evaled);
  
        message.channel.send(clean(evaled), {code:"xl"});
      } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
      }
    }
  });



command(client, 'members', (message) => {
  client.guilds.cache.forEach((guild) => {
    message.channel.send(
      `${guild.name} has a total of ${guild.memberCount} members`
    )
  })
})

client.on('message', msg => {
  if (msg.content === `hi`) {
    msg.channel.send('Hi!')
  }
});

client.on('message', msg => {
  if (msg.content === `js!sdasa`) {
    msg.channel.send('<@755810994739085414>')
  }
});

command(client, 'status', (message) => {
  const content = message.content.replace('js!status ', '')
  if(message.author.id !== "743453469947592746") return message.reply('You are not my owner.')
  
  client.user.setPresence({
    activity: {
      name: content,
      type: 'WATCHING',
    },
  })
})

client.login(process.env.DISCORD_TOKEN);