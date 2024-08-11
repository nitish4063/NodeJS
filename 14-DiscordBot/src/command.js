const { REST, Routes } = require("discord.js");

const commands = [
  {
    name: "ping",
    description: "Replies with Pong!",
  },
  {
    name: "create",
    description: "Hor Pra",
  },
];

const { TOKEN, CLIENT_ID } = require("../info.js");

const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
