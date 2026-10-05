import {
  Client,
  Events,
  GatewayIntentBits,
} from "discord.js";
import { config } from "./config.js";
import { handleCommand } from "./commands.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, readyClient => {
  console.log(`BAZA Bot online as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  try {
    await handleCommand(interaction);
  } catch (error) {
    console.error("Interaction error:", error);

    const reply = {
      content: "❌ BAZA Bot столкнулся с ошибкой.",
      ephemeral: true,
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(reply);
    } else {
      await interaction.reply(reply);
    }
  }
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isButton()) return;
  if (interaction.customId !== "join-server") return;

  await interaction.reply({
    content:
      "🎮 **BAZA server connection**\n\n" +
      "Подключение к CS2 будет добавлено после интеграции BAZA Server API.",
    ephemeral: true,
  });
});

client.login(config.token);
