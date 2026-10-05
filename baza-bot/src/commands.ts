import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from "discord.js";

export const commands = [
  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Показать команды BAZA"),
  new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Показать BAZA-профиль"),
  new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Показать игровую статистику"),
  new SlashCommandBuilder()
    .setName("servers")
    .setDescription("Показать BAZA-серверы"),
  new SlashCommandBuilder()
    .setName("play")
    .setDescription("Найти сервер для игры")
    .addStringOption(option =>
      option
        .setName("mode")
        .setDescription("Режим")
        .setRequired(false)
        .addChoices(
          { name: "Retake", value: "retake" },
          { name: "Deathmatch", value: "dm" },
          { name: "1v1", value: "1v1" },
          { name: "Aim", value: "aim" },
          { name: "Surf", value: "surf" },
        )
    ),
  new SlashCommandBuilder()
    .setName("events")
    .setDescription("Показать ближайшие события BAZA"),
  new SlashCommandBuilder()
    .setName("leaderboard")
    .setDescription("Показать лидерборд BAZA"),
  new SlashCommandBuilder()
    .setName("report")
    .setDescription("Сообщить о проблеме")
    .addStringOption(option =>
      option
        .setName("message")
        .setDescription("Что произошло?")
        .setRequired(true)
        .setMaxLength(1000)
    ),
].map(command => command.toJSON());

export async function handleCommand(interaction: ChatInputCommandInteraction) {
  switch (interaction.commandName) {
    case "help":
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("BAZA")
            .setDescription(
              "PLAY. IMPROVE. COMPETE.\n\n" +
              "**/play** — найти сервер\n" +
              "**/servers** — список серверов\n" +
              "**/profile** — твой профиль\n" +
              "**/stats** — статистика\n" +
              "**/events** — события\n" +
              "**/leaderboard** — лидерборд\n" +
              "**/report** — сообщить о проблеме"
            )
            .setColor(0xff0033),
        ],
      });

    case "profile":
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`BAZA PROFILE · ${interaction.user.username}`)
            .setDescription(
              "**LEVEL 1**\n" +
              "XP · 0 / 1000\n\n" +
              "Rating · —\n" +
              "Matches · 0\n" +
              "Wins · 0\n" +
              "Winrate · —\n" +
              "K/D · —\n\n" +
              "🔥 Start your BAZA journey."
            )
            .setColor(0xff0033),
        ],
      });

    case "stats":
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("BAZA STATS")
            .setDescription(
              "Matches · **0**\nWins · **0**\nLosses · **0**\n" +
              "K/D · **—**\nHeadshots · **0%**\nMVP · **0**"
            )
            .setColor(0xff0033),
        ],
      });

    case "servers":
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("BAZA SERVERS")
            .setDescription(
              "🟢 **RETAKE #01** · 18/20\n" +
              "🟢 **DM #01** · 16/20\n" +
              "🟢 **1V1 #01** · 8/10\n" +
              "🟢 **AIM #01** · 12/16\n" +
              "🟡 **SURF #01** · 4/20"
            )
            .setColor(0xff0033),
        ],
      });

    case "play": {
      const mode = interaction.options.getString("mode") ?? "retake";
      const names: Record<string, string> = {
        retake: "RETAKE #01",
        dm: "DM #01",
        "1v1": "1V1 #01",
        aim: "AIM #01",
        surf: "SURF #01",
      };
      const server = names[mode] ?? names.retake;

      const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
        new ButtonBuilder()
          .setLabel("JOIN SERVER")
          .setStyle(ButtonStyle.Danger)
          .setCustomId("join-server")
      );

      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`🟢 ${server}`)
            .setDescription(
              `Mode · **${mode.toUpperCase()}**\n` +
              "Players · **18/20**\n" +
              "Region · **EU**\n" +
              "Status · **ONLINE**\n\n" +
              "Server connection will be connected to BAZA API later."
            )
            .setColor(0xff0033),
        ],
        components: [row],
      });
    }

    case "events":
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("BAZA EVENTS")
            .setDescription(
              "🏆 **BAZA Retake Cup**\nSaturday · 19:00\n\n" +
              "🔥 **BAZA Chaos Night**\nFriday · 21:00\n\n" +
              "🎯 **1v1 One Tap**\nSunday · 18:00"
            )
            .setColor(0xff0033),
        ],
      });

    case "leaderboard":
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("BAZA LEADERBOARD")
            .setDescription(
              "1. **BAZA Player** · 1820\n" +
              "2. **Player Two** · 1764\n" +
              "3. **Player Three** · 1692\n\n" +
              "Your rating · **—**"
            )
            .setColor(0xff0033),
        ],
      });

    case "report": {
      const message = interaction.options.getString("message", true);
      return interaction.reply({
        content:
          `✅ Репорт принят.\n\n` +
          `**От:** ${interaction.user}\n` +
          `**Сообщение:** ${message}\n\n` +
          "В следующей версии репорты будут отправляться в BAZA staff panel.",
        ephemeral: true,
      });
    }
  }
}
