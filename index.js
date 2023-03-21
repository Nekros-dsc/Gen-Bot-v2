const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs')	
let parametregalackgen = JSON.parse(fs.readFileSync(__dirname+"/parametregalackgen.json"));	
let prefix = parametregalackgen['prefix'];    
let TOKEN = ("bot-token-here");    
let cooldown = parametregalackgen['cooldown'] 
const Nombot = "Nova-Gen-Bot-v2" 
const generated = new Set();	
const chalk = require('chalk');
const moment = require('moment');
const { json } = require('express');


  bot.on('ready', msg => {
  console.log("");                                   
  console.log((chalk.cyan(`                                              ______                                            ______                      `)));
  console.log((chalk.cyan(`                                             /      \                                          /      \                     `)));
  console.log((chalk.red(`                                            /$$$$$$  |  ______   __     __  ______   _______  /$$$$$$  |  ______   _______  `)));
  console.log((chalk.cyan(`                                            $$ \__$$/  /      \ /  \   /  |/      \ /       \ $$ | _$$/  /      \ /       \ `)));
  console.log((chalk.cyan(`                                            $$      \ /$$$$$$  |$$  \ /$$//$$$$$$  |$$$$$$$  |$$ |/    |/$$$$$$  |$$$$$$$  |`)));
  console.log((chalk.red(`                                             $$$$$$  |$$    $$ | $$  /$$/ $$    $$ |$$ |  $$ |$$ |$$$$ |$$    $$ |$$ |  $$ |`)));
  console.log((chalk.cyan(`                                            /  \__$$ |$$$$$$$$/   $$ $$/  $$$$$$$$/ $$ |  $$ |$$ \__$$ |$$$$$$$$/ $$ |  $$ |`)));
  console.log((chalk.cyan(`                                            $$    $$/ $$       |   $$$/   $$       |$$ |  $$ |$$    $$/ $$       |$$ |  $$ |`)));
  console.log((chalk.red(`                                             $$$$$$/   $$$$$$$/     $/     $$$$$$$/ $$/   $$/  $$$$$$/   $$$$$$$/ $$/   $$/ `)));
  console.log("");                                  
  console.log((chalk.red(`                                                               Crée par i7#1717 !`)));  
  console.log((chalk.red(`                                                                © 2023 I7#1717, Inc.`))); 
  console.log("");                                   
  console.log((chalk.cyan(`                                                         Discord: https://discord.gg/i7shop`)));   
  
  console.log("");                                  

  console.log(`Statistiques globales : \n\nLe bot a un total de ${bot.guilds.size} serveurs. \nPour un total de ${bot.users.size} membres.`)
  console.log("Connecté en tant que " + bot.user.id + " | Prefix : " + prefix+ " | Nombre de Serveurs "+ bot.guilds.size +" | Nombres de salons "+ bot.channels.size +" | Utilisateur totaux "+ bot.users.size +" | Nombre d'emojis totaux "+ bot.emojis.size +'');
  bot.user.setActivity(".gg/novaworld - Nova-Gen-v2 ");
});

bot.on("message", async message => {	
    prefix = parametregalackgen['prefix'];	
    cooldown = parametregalackgen['cooldown']	
    if (message.author.bot) return;	
    var command = message.content	
    .toLowerCase()	
    .slice(prefix.length)	
    .split(" ")[0];	

    if (command === "gen") {	
        if (generated.has(message.author.id)) {	
                 const embed = new Discord.RichEmbed()
                .setTitle("Merci de patientez")
                .setURL("https://github.com/Nekros-dsc")
                .setDescription(":no_entry: Attendez avant de générer un autre compte "+message.author+"")
                .setFooter(`discord.gg/novaworld`)
                .setTimestamp()
                .setColor("RANDOM");
                message.channel.send(embed);
        } else {	

            let messageArray = message.content.split(" ");	
            let args = messageArray.slice(1);	
                 const errorgen = new Discord.RichEmbed()
                .setTitle("Service introuvable")
                .setURL("https://github.com/Nekros-dsc")
                .setDescription(":no_entry: Veuillez préciser le service que vous souhaitez!")
                .setFooter(`discord.gg/novaworld`)
                .setTimestamp()
                .setColor("RANDOM");
                if (!args[0]) return message.channel.send(errorgen);

            let data;	
            try{	
                data = fs.readFileSync(__dirname + "/comptes/" + args[0].toLowerCase() + ".json")	

            } catch{	
                const error = new Discord.RichEmbed()
                .setTitle("Service introuvable")
                .setURL("https://github.com/Nekros-dsc")
                .setDescription(":no_entry: Le service `"+args[0]+"` n'existe pas")
                .setFooter(`discord.gg/novaworld`)
                .setTimestamp()
                .setColor("RANDOM");
                return message.channel.send(error);

            } 	
            let account = JSON.parse(data)
                const compte = new Discord.RichEmbed()
                .setTitle("Aucun compte disponible")
                .setURL("https://github.com/Nekros-dsc")
                .setDescription(":no_entry: Il n'y a aucun compte disponible pour `"+args[0]+"`")
                .setFooter(`discord.gg/novaworld`)
                .setTimestamp()
                .setColor("RANDOM");
                if (account.length <= 0) return message.channel.send(compte);


                const embed = {	
                    title: "Votre compte " + args[0] + " c'est généré avec succès!",	
                    description: ":ballot_box_with_check: J'ai envoyer votre compte en message privé!",	
                    color: 3092790,   
                    footer: {	
                        text: `© Nova World ${Nombot}`	
                    },	
                };	

                await message.channel.send({ embed });	
                await generated.add(message.author.id);	
                await message.author.send({embed: {	
                    "title": "Voici votre compte " + args[0] + " générer",	
                    "color": 3092790,  
                    "image": {
                    "url": ""
                    },
                    "footer": {   
                        "text": `© Nova World ${Nombot}`    
                    },  
                    "fields": [	
                      {	
                        "name": "Pseudo/Email",	
                        "value": "`"+account[0].email+"`"	
                      },	
                      { 
                        "name": "Mot de passe", 
                        "value": "`"+account[0].mdp+"`" 
                      },
                      { 
                        "name": "Copier-coller", 
                        "value": "`"+account[0].email+":"+account[0].mdp+"`" 
                      },
                    ]	
                  }	
                })	
                account.splice(0,1)	
                console.log(account)	
                fs.writeFileSync(__dirname + "/comptes/" + args[0] + ".json", JSON.stringify(account));	
                setTimeout(() => {	
                    generated.delete(message.author.id);	
                }, cooldown);	
        }	
    }	

    if (command === "check") {	
        let messageArray = message.content.split(" ");	
        let args = messageArray.slice(1);	
        let data;	
                const errorcheck = new Discord.RichEmbed()
                .setTitle("Merci de choisir un service")
                .setURL("https://github.com/Nekros-dsc")
                .setDescription(":no_entry: Veuillez préciser le service que vous souhaitez!")
                .setFooter(`discord.gg/novaworld`)
                .setTimestamp()
                .setColor("RANDOM");
                if (!args[0]) return message.channel.send(errorcheck);
	
        try{	
            data = JSON.parse(fs.readFileSync(__dirname + "/comptes/" + args[0] + ".json"))	
                const embed = new Discord.RichEmbed()
                .setTitle("Voici le stock de "+args[0]+"")
                .setURL("https://github.com/Nekros-dsc")
                .setDescription("Il y a `"+data.length+" comptes` dans `"+args[0]+"`")
                .setFooter(`discord.gg/novaworld`)
                .setTimestamp()
                .setColor("RANDOM");
                message.channel.send(embed);

        } catch {	
                const error = new Discord.RichEmbed()
                .setTitle("Service introuvable")
                .setURL("https://github.com/Nekros-dsc")
                .setDescription(":no_entry: Le service `"+args[0]+"` n'existe pas")
                .setFooter(`discord.gg/novaworld`)
                .setTimestamp()
                .setColor("RANDOM");
                return message.channel.send(error);
        } 	
    }	

    if (command === "change"){	
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Désolé, vous ne pouvez pas le faire, vous n'êtes pas un administrateur!");	
        let messageArray = message.content.split(" ");	
        let args = messageArray.slice(1);	
        try{	
            parametregalackgen[args[0].toLowerCase()] = args[1].toLowerCase()	
            fs.writeFileSync(__dirname+"/parametregalackgen.json", JSON.stringify(parametregalackgen));	
                const change = new Discord.RichEmbed()
                .setTitle(""+args[0]+" changer avec succès")
                .setURL("https://github.com/Nekros-dsc")
                .setDescription(":ballot_box_with_check: `"+args[0]+"` changé en `"+args[1]+"`")
                .setFooter(`discord.gg/novaworld`)
                .setTimestamp()
                .setColor("RANDOM");
                message.channel.send(change);

        } catch{	
            message.reply("Une erreur s'est produite")	
        }	
    }	

    if(command === "stock"){	
        let stock = []	

        fs.readdir(__dirname + "/comptes/", function (err, files) {	
            if (err) {	
                return console.log('Impossible de scanner le répertoire: ' + err);	
            } 	

            files.forEach(function (file) {	
                if (!file.includes(".json")) return	
                if (file.includes('package-lock') || file.includes('package.json') || file.includes('parametregalackgen.json')) return	
                stock.push(file) 	
            });	
            console.log(stock)	

            stock.forEach(async function (data) {	
                let acc = await fs.readFileSync(__dirname + "/comptes/" + data)	
                const embed = new Discord.RichEmbed()
                .setTitle(`Voici le stock actuel`)
                .setURL("https://github.com/Nekros-dsc")
                .setDescription("`"+data.replace(".json","")+"` a `"+JSON.parse(acc).length+" comptes`\n")
                .setFooter(`discord.gg/novaworld`)
                .setTimestamp()
                .setColor("RANDOM");
                message.channel.send(embed);

            })	

        });	
    }	

    if(command === "add") {	
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Désolé, vous ne pouvez pas le faire, vous n'êtes pas un administrateur!");	
        let messageArray = message.content.split(" ");	
        let args = messageArray.slice(1);	
        var acc = args[1].split(":");	

        fs.readFile(__dirname + "/comptes/" + args[0].toLowerCase() + ".json",function(err, data) { 	
        if(err){	
            let newnewData = 	
            [{	
                "email":acc[0],	
                "mdp":acc[1]	
            }]	
            try {	
                fs.writeFileSync(__dirname + "/comptes/" + args[0].toLowerCase()+".json", JSON.stringify(newnewData))	
                      const embed = new Discord.RichEmbed()
                     .setTitle(`Le service ${args[0]} viens d'être crée avec succès`)
                     .setURL("https://github.com/Nekros-dsc")
                     .setDescription(`:ballot_box_with_check: Service ${args[0]} créé et compte ajouté`)
                     .setFooter(`discord.gg/novaworld`)
                     .setTimestamp()
                     .setColor("RANDOM");
                   message.channel.send(embed);

            } catch {	
                message.channel.send('**Erreur** Impossible de créer un service et d\'ajouter ce compte!')	

            }	
        }	

        else {	
            let newData = {"email":acc[0],"mdp":acc[1]}	
            data = JSON.parse(data)	
            try{	
                data.push(newData)	
                fs.writeFileSync(__dirname + "/comptes/" + args[0].toLowerCase()+".json", JSON.stringify(data))	
                      const embed = new Discord.RichEmbed()
                     .setTitle(`Compte ajouté avec succès`)
                     .setURL("https://github.com/Nekros-dsc")
                     .setDescription(`:ballot_box_with_check: Compte ajouté avec succès`)
                     .setFooter(`discord.gg/novaworld`)
                     .setTimestamp()
                     .setColor("RANDOM");
                   message.channel.send(embed);

            } catch {	
                message.channel.send('**Erreur** Impossible d\'ajouter ce compte!')	
            }	
        }	
    }); 	
}	
if(command === "botinfo") {	
    const d = moment.duration(message.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} jour` : `${d.days()} jours`;
    const hours = (d.hours() == 1) ? `${d.hours()} heure` : `${d.hours()} heures`;

    const botinfo = new Discord.RichEmbed()
      .setTitle(`Informations sur ${Nombot}`)
      .setThumbnail(message.guild.iconURL)
      .setDescription(`${Nombot} est un bot Discord pour générer des compte en tout genre.`)
      .addField('Pseudo', message.client.user.username, true)
      .addField('Discriminateur', `\`#${message.client.user.discriminator}\``, true)
      .addField('ID', `\`${message.client.user.id}\``, true)
      .addField('Surnom', (message.guild.me.nickname) ? message.guild.me.nickname : '`Aucun`', true)
      .addField('Prefix', `\`${prefix}\``, true)
      .addField('Membres totals', `\`${message.client.users.size - 1}\``, true)
      .addField('Serveurs', `\`${message.client.guilds.size}\``, true)
      .addField('Disponibilité', `\`${days}\` et \`${hours}\``, true)
      .addField('Version actuelle', `\`2.0.1\``, true)
      .addField('Développeur de la source', `\`!"Nekros#9999\``, true) //NE PAS TOUCHER CETTE LIGNE
      .setFooter(`discord.gg/novaworld`)
      .setTimestamp()
      .setColor("RANDOM");
    message.channel.send(botinfo);
}
if(command === "help") {	
    if (!message.member.hasPermission("ADMINISTRATOR")) {	
      const embed = new Discord.RichEmbed()
      .setTitle(`Commandes de ${Nombot}`)
      .setURL("https://github.com/Nekros-dsc")
      .setThumbnail(message.guild.iconURL)
      .setDescription(`Voici les commandes de ${Nombot}`)
      .addField(`${prefix}gen [nom de service]`, '`générer un compte de ce service`')
      .addField(`${prefix}check [nom de service]`, '`vérifier le nombre de comptes sur ce serveur`')
      .addField(`${prefix}stock`, '`vérifier les services et les comptes`')
      .addField(`${prefix}botinfo`, '`Avoir les Informations sur le bot`')
      .setFooter(`discord.gg/novaworld`)
      .setTimestamp()
      .setColor("RANDOM");
    message.channel.send(embed);
} else {	
      const embed = new Discord.RichEmbed()
      .setTitle(`Commandes du bot Gen v2`)
      .setURL("https://github.com/Nekros-dsc")
      .setThumbnail(message.guild.iconURL)
      .setDescription(`Voici les commandes de SevenGen v2`)
      .addField(`${prefix}gen [nom de service]`, '`générer un compte de ce service`')
      .addField(`${prefix}check [nom de service]`, '`vérifier le nombre de comptes sur ce serveur`')
      .addField(`${prefix}stock`, '`vérifier les services et les comptes`')
      .addField(`${prefix}add [nom de service] [email:mdp]`, '`ajoutez ce compte au service, n\'oubliez pas d\'utiliser la syntaxe email:mdp`')
      .addField(`${prefix}change [cooldown, prefix] [choix]`, '`changer le préfix ou le temps de recharge (option) en une valeur, pour le temps de recharge rappelez-vous que la valeur doit être en ms`')
      .addField(`${prefix}botinfo`, '`Avoir les Informations sur le bot`')
      .setFooter(`discord.gg/novaworld`)
      .setTimestamp()
      .setColor("RANDOM");
    message.channel.send(embed);
}   
        }  

    });     
 
bot.login(TOKEN);	
