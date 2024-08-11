const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const { TOKEN } = require("../info.js");

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    return message.reply({
      content: "Generating Short ID for " + url,
    });
  }
  message.reply({
    content: "Hello from Bot",
  });
});

client.on("interactionCreate", (interaction) => {
  console.log(interaction);
  interaction.reply("PONG!!!!");
});

client.login(TOKEN);
