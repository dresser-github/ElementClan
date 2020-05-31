const Discord = require("discord.js");
const client = new Discord.Client();
const { Client, RichEmbed } = require('discord.js'); 
const ms = require("ms");
const fs = require('fs');


client.login(process.env.MIRROR);


client.on("ready", () => {
  console.log(
    "Bot: MIRROR " +
      `${client.users.size}` +
      " users, in " +
      `${client.channels.size}` +
      " channels of " +
      `${client.guilds.size}` +
      " guilds."
  );

  //bot status
  client.user.setStatus("online");
  client.user.setPresence({
    game: {
      name: "ElementClan",
      type: "WATCHING",
      url:
        "https://www.youtube.com/channel/UCjjsEnIg5cDkw35UCD35bUA?view_as=subscriber"
    }
  });
});


//welcome message
client.on("guildMemberAdd", (member) => {
  let guild = member.guild;
  let memberid = member.user.id;
  if (guild.systemChannel) {
    guild.systemChannel.send("<@" + memberid + "> Join the server!");
  }
});


//leave message
client.on("guildMemberRemove", (member) => {
  let guild = member.guild; 
  let membertag = member.user.tag;
  if(guild.systemChannel){
    guild.systemChannel.send(membertag + " Left the server!");
  }
});


//bot mention
client.on('message', message => {
  if (message.content === '<@712046198038593588>') {
   message.channel.send("**Usage:  ``/help``**");
  }
}); 


//commands
client.on("message", async message => {  
  if(message.author.bot) return; 
  if(message.content.indexOf(process.env.PREFIX) !== 0) return; 
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  //help command
    if(command === "help") {
    let help = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setDescription('Command list:')
      .setColor("#00FFFF")
      .addField("Server info", "/server")
      .addField("Twitter", "/twitter")
      .addField("Avatar", "/avatar [member]")
      .addField("Clear", "/clear [number]")
      .addField("Say", "/say [message]")
      .addField("Say embed", "/embed [message]")
      .addField("Random number", "/ramdom")
      .addField("Ping", "/ping")
      .setTimestamp()
    return message.channel.send(help);
  } 


 //mirror
   if(command === "mirror") {
    message.channel.send("**MIRROR »** https://discord.gg/ht3sNAT");
  }


//mirror ip
   if(command === "mirror-ip") {
    const ip = new RichEmbed()  
       .setColor("#00FFFF") 
       .setTitle("Ip: mirror.my-srv.net\nPort: 12068") 
    message.channel.send(ip);
  }


 //elementclan twitter
   if(command === "twitter") {
    message.channel.send("**ElementClan (EC):** https://twitter.com/ElementalClannn");
  }


 //itsmxrcos
   if(command === "itsmxrcos") {
    message.channel.send("**ItsMxrcos:** https://www.youtube.com/channel/UCzpIwD9mrzRsD3WiMCljZiw");
  }


 //dresser
   if(command === "dresser") {
    message.channel.send("**dresser:** https://www.youtube.com/DresserPrince");
  }


  //server info
    if(command === "server") {
    let server = new Discord.RichEmbed()
      .setAuthor(message.guild.name, message.guild.iconURL)
      .setColor("#00FFFF")
      .addField("Name", message.guild.name)
      .addField("Owner", message.guild.owner.user.tag)
      .addField("Region", message.guild.region)
      .addField("Members", message.guild.members.size)
      .addField("Channels", message.guild.channels.size)
      .addField("Roles", message.guild.roles.size)
      .setThumbnail(message.guild.iconURL)
      .setTimestamp()
    return message.channel.send(server);
}


  //random number command
    if(command === "random") {
    const lol = args.join(" ");
    var random = Math.floor(Math.random() *100)+1;
    message.channel.send(random + " " + lol);
  }


  //say command
    if(command === "say") {
    if(!message.member.hasPermission("ADMINISTRATOR")){
    return message.channel.send("You do not have permission to use this command!").catch(console.error);
    }
      
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});  
    message.channel.send(sayMessage);
  }


  //embed command
    if(command === "embed") {
    if(!message.member.hasPermission("ADMINISTRATOR")){
    return message.channel.send("You do not have permission to use this command!").catch(console.error);
    }
    const embedMessage = args.join(" ");  
    const embed = new RichEmbed()  
       .setColor("#00FFFF") 
       .setTitle(embedMessage) 
    message.delete().catch(O_o=>{});
    message.channel.send(embed) 
  } 


  //avatar command
    if(command === "avatar") {
       let user = message.mentions.users.first();
    if(!user) user = message.author;
    let color = message.member.displayHexColor;
    if (color == '#A020F0') color = message.member.hoistRole.hexColor;
    const embed = new Discord.RichEmbed()
                   .setImage(user.avatarURL)
                   .setColor("#00FFFF")
    message.channel.send({embed});
  }

  
  //ping command
    if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`**Pong! ${m.createdTimestamp - message.createdTimestamp}ms**`);
  }
  

  //clear command
    if(command === "clear") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")){
    return message.channel.send("You do not have permission to use this command!").catch(console.error);
    }
      
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 1000)
      return message.channel.send("Please indicate how many messages you want to delete.!");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.channel.send(`Error: ${error}`))
    message.channel.send("**You cleared " + deleteCount + " messages**").then(function(message) {
     message.delete(5000);
   });
  }
});
