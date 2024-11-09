#!/usr/bin/env node
const { Command } = require("commander");
const fs = require("fs-extra");
const path = require("path");

const program = new Command();

program
  .version("1.0.0")
  .description("Scaffold a basic Elysia app with GitHub authentication");

program
  .argument("<directory>", "directory to create the app in")
  .action(async (directory) => {
    const targetPath = path.resolve(directory);
    const templatePath = path.resolve(__dirname, "../templates/app");

    try {
      await fs.copy(templatePath, targetPath);

      await fs.rename(
        path.join(targetPath, ".env.example"),
        path.join(targetPath, ".env")
      );

      console.log(`App created in ${targetPath}`);
      console.log("Remember to set up environment variables in the .env file.");
    } catch (error) {
      console.error("Failed to create app:", error);
    }
  });

program.parse(process.argv);
