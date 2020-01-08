let guilds = {};

const getGuildData = (guild) => {
	if (!guilds[guild.id]) {
		guilds[guild.id] = {
			prefix: '!',
			accounts: {}
		}
	}
	return guilds[guild.id];
}
