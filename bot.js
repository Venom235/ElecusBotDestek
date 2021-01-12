const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const db = require('quick.db')
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment') 
require('./util/eventLoader')(client);
var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${  files.undefined} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.elevation = message => {
  if (!message.guild) {
      return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 5;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('ready', () => {
  console.log(client.user.username)
})

client.login(process.env.token)
/// KOMUTLAR

//----------------------------------------------------HOŞ-GELDİN-MESAJI---------------------------------------------------\\     

//ELECUSBOT EMEJİLİ HG

client.on('guildMemberAdd', async member => {
  await member.roles.add(`797405190226444289`) //id yazan yere verilecek rol (unregistered)
  await member.roles.add(`797405190226444289`) //id yazan yere verilecek rol (unregistered)
    let member2 = member.user
   var toplamsayı = client.guilds.cache.get("792773099720015912").members.cache.size.toString().replace(/ /g, " ")
var ts = toplamsayı.match(/([0-9])/g)
toplamsayı = toplamsayı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()

if(ts) {
toplamsayı = toplamsayı.replace(/([0-9])/g, d => {
return {
  '0': `<a:sayyesil0:783038422410854400>`,
  '1': `<a:sayyesil1:783038456749359164>`,
  '2': `<a:sayyesil2:783038476575834153>`,
  '3': `<a:sayyesil3:783038499758538852>`,
  '4': `<a:sayyesil4:783038504090206228>`,
  '5': `<a:sayyesil5:783038504560361514>`,
  '6': `<a:sayyesil6:783038505545629737>`,
  '7': `<a:sayyesil7:783038504920940554>`,
  '8': `<a:sayyesil8:783038506003464222>`,
  '9': `<a:sayyesil9:783038505826648135>`}[d];
})
}
let zaman = new Date().getTime() - member2.createdAt.getTime()
var user = member2
var takizaman = [];
if(zaman < 604800000) {
takizaman = '**Tehlikeli**'
} else {
takizaman = `**Güvenli**`}require("moment-duration-format");
 let zaman1 = new Date().getTime() - user.createdAt.getTime()
 const gecen = moment.duration(zaman1).format(` **YY [Yıl,] DD [Gün,] HH [Saat,] mm [Dakika,] ss [Saniye]** `)
 let dbayarfalanfilan = await db.fetch(`takidbayar${member.guild.id}`)
 let message = member.guild.channels.cache.find(c => c.id === `797411975771717642`)
 message.send(`<a:elecus_balon:797413682211979294> **Hoşgeldin! ${member} Seninle Beraber ${toplamsayı} Kişiyiz**

<a:elecus_balon:797413682211979294> ** **Kayıt Olmak İçin Ses Kanallarına Girebilirsin**

<a:elecus_balon:797413682211979294> ** <@&795774645159985174> **Rolündeki Seninle İlgilenecektir**

<a:elecus_balon:797413682211979294> **Hesabın** ${gecen} **Tarihinde Oluşturulmuş**

<a:elecus_balon:797413682211979294> **Hesap Durumu :** ${takizaman} `)

         });

//ELECUSBOT EMEJİLİ HG

//----------------------------------------------------HOŞ-GELDİN-MESAJI---------------------------------------------------\\     

