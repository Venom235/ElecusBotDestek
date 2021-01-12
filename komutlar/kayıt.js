const Discord = require("discord.js");
const db = require('quick.db');

exports.run = (client, message, args) => {
    if(!["795774645159985174", "795774644673445919"].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) return;

//------------------------------------KANALLAR-----------------------------------\\ 
  
  const erkekd = message.guild.roles.cache.find(r => r.id === "795774647517708308"); //Erkek rolünün IDsini girin.

  const erkek2 = message.guild.roles.cache.find(r => r.id === "797409090359001109"); //Erkek rolünün IDsini girin.
  
  const kadın = message.guild.roles.cache.find(r => r.id === "795774647517708308"); //Kadın rolünün IDsini girin.

  const kadın2 = message.guild.roles.cache.find(r => r.id === "797409430207201281"); //Kadın rolünün IDsini girin.

  const unregister = message.guild.roles.cache.find(r => r.id === "797405190226444289"); //Kayıtsız rolünün IDsini girin.
  
//------------------------------------KANALLAR-----------------------------------\\ 
  
  const log = message.guild.channels.cache.find(c => c.id === "797411975771717642"); //Kayıt kanalının IDsini girin.
    
//------------------------------------KANALLAR-----------------------------------\\    
    
//------------------------------------------------ROL-VERME-----------------------------------------------\\     
  
  let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
  if(!member) return message.channel.send("Bir kullanıcı girin.")
  const stg = message.guild.member(member)
  
//------------------------------------------------ROL-VERME-----------------------------------------------\\     
  const embed = new Discord.MessageEmbed()
  .setTitle("Elecus Destek Sunucusu")
  .setDescription(`<@${stg.user.id}> adlı Kullanıcının Kayıt işleminin tamamlanması için cinstiyetini Belirlemelisin.
Erkek ise ♂ Emojisine, Kadın ise ♀ Emojisine Basın.`)
  .setFooter("Elecus Destek Sunucusu")
  .setColor("GOLD")
  log.send(embed).then(async mesaj => {
    await mesaj.react('♂') 
    await mesaj.react('♀')
    
    const erkekemoji = (reaction, user) => reaction.emoji.name === '♂' && user.id === message.author.id;
    const kadinemoji = (reaction, user) => reaction.emoji.name === '♀' && user.id === message.author.id;
    
    const erkek = mesaj.createReactionCollector(erkekemoji, { time: 10000 });
    const kadin = mesaj.createReactionCollector(kadinemoji, { time: 10000 });
    
    erkek.on('collect', async striga => {
      mesaj.reactions.removeAll()
      stg.roles.add(erkekd)
      stg.roles.add(erkek2)
      stg.roles.remove(unregister)
      
      const erkekEmbed = new Discord.MessageEmbed()
      .setColor(erkekd.color ? erkekd.color : "#51adcf")
      .setTitle("Elecus Destek Sunucusu")
      .setDescription(`<a:elecus_balon:797413682211979294> \`Kayıt İşlemi\` **Başarılı!**
<a:elecus_balon:797413682211979294> \`Yetkili:\` ${message.author.username}
<a:elecus_balon:797413682211979294> \`Kullanıcı:\` <@${stg.user.id}>
<a:elecus_balon:797413682211979294> \`Verilen Rol:\` <@&${erkekd.id}> <@&${erkek2.id}>`)
      .setFooter("Elecus Destek Sunucusu")
      mesaj.edit(erkekEmbed)
      await mesaj.react("795770170445398046")
    })
    
    kadin.on('collect', async striga => {
      mesaj.reactions.removeAll()
      stg.roles.add(kadın)
      stg.roles.add(kadın2)
      stg.roles.remove(unregister)
      
      const kadinEmbed = new Discord.MessageEmbed()
      .setColor(kadın.color ? kadın.color : "RANDOM")
      .setTitle("Elecus Destek Sunucusu")
      .setDescription(`<a:elecus_balon:797413682211979294> \`Kayıt İşlemi\` **Başarılı!**
<a:elecus_balon:797413682211979294> \`Yetkili:\` ${message.author.username}
<a:elecus_balon:797413682211979294> \`Kullanıcı:\` <@${stg.user.id}>
<a:elecus_balon:797413682211979294> \`Verilen Rol:\` <@&${kadın.id}> <@&${kadın2.id}>`)
      .setFooter("Elecus Destek Sunucusu")
      mesaj.edit(kadinEmbed)
      await mesaj.react("795770170445398046")
    })
  })

//------------------------------------------------ROL-VERME-----------------------------------------------\\     
  
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["k", "register"],
  permLevel: 0
};
exports.help = {
  name: "kayıt",
  description: "",
  usage: ""
};
   