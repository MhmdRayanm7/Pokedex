import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapB } from "./command_mapb.js";
import { CLICommand } from "./state.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },

    help: {
      name: "help",
      description: "Help for Pokedex",
      callback: commandHelp,
    },

    map: {
      name: "map",
      description:
        "Displays the names of 20 location areas in the Pokemon world",
      callback: commandMap,
    },

    mapb: {
      name: "mapb",
      description:
        "Displays the previous 20 locations areas in the Pokemon world",
      callback: commandMapB,
    },

    explore: {
      name: "explore <location_name>",
      description: "Explore a location",
      callback: commandExplore,
    },

    catch: {
      name: "catch <pokemon_name>",
      description: "Attempt to catch a pokemon",
      callback: commandCatch,
    },

    inspect: {
      name: "inspect <pokemon_name>",
      description: "View details about a caught pokemon",
      callback: commandInspect,
    },
  };
}
