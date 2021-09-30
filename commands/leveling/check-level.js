const { Client, Message, MessageEmbed } = require('discord.js');
const Schema = require('../../utils/models/level')

module.exports = {
    name: 'check-level-channel',
    description: '',
    usage: '',
    aliases: ['clevel'],
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        if (!message.member.permissions.has("MANAGE_CHANNELS")) return message.reply("You dont have enough permission to excute this command!")


        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (!data) return message.channel.send('This Guild has no data Stored!!')
            const channel = client.channels.cache.get(data.Channel)

            const checklevel = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('Level-UP Channel')
                .setDescription(`Level-UP Channel => ${channel}`)
                .setThumbnail('https://cdn.discordapp.com/attachments/889793792041975828/892951771427786762/standard.gif')
                .setFooter('Billi')
            message.channel.send(checklevel)
        })
    }
}