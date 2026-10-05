import { REST, Routes } from "discord.js";
import { config } from "./config.js";
import { commands } from "./commands.js";

const rest = new REST({ version: "10" }).setToken(config.token);

async function main() {
  console.log("Registering BAZA slash commands...");

  await rest.put(
    Routes.applicationGuildCommands(config.clientId, config.guildId),
    { body: commands }
  );

  console.log("BAZA slash commands registered.");
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
