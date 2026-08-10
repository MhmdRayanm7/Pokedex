import { CLICommand } from "./commands.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex!\nUsage:");
    console.log();
    for (const command of Object.values(commands)) {
    console.log(`${command.name}: ${command.description}`);
    }
};
