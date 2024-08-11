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

const rest = new REST({ version: "10" }).setToken(
  "MTI3MjIyNTE5MDc4ODU5NTkyMw.GxcoKV.f_yoiwyieqScPce-Ig2K2Iq2mN1C9b4jXnbH3s"
);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands("1272225190788595923"), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
