const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../utils/models/level')

module.exports = {
    name: 'set-levelup-channel',
    description: '',
    usage: '',
    aliases: ['setlevelup' , 'levelchannel'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("You dont have enough permission to excute this command!")

        const channel = message.mentions.channels.first();
        if (!channel) message.channel.send(`plz mention a channel like #level`)

        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (data) {
                data.Channel = channel.id
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id
                }).save()
            }
            // db.set(`welcomeChannel_${message.guild.id}`, channel.id)

            const levelup = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Level-UP Channel')
                .setDescription(`${channel} has been set as a Level-UP Channel`)
                .setThumbnail('https://cdn.discordapp.com/attachments/889793792041975828/892951771427786762/standard.gif')
                .setFooter('Billi')
            message.channel.send(levelup)
        })
    }

}