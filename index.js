require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const axios = require('axios');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once('ready', () => {
  console.log(`✅ Bot ist online als ${client.user.tag}`);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return; // Ignoriere Bot-Nachrichten

  try {
    // Send message content to n8n webhook
    await axios.post(process.env.WEBHOOK_URL, {
      username: message.author.username,
      content: message.content,
    });
    console.log('Nachricht an n8n Webhook gesendet');
  } catch (error) {
    console.error('Fehler beim Senden der Nachricht an n8n Webhook:', error);
  }
});

client.login(process.env.DISCORD_TOKEN);