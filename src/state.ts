import { createInterface, type Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, ShallowLocations, Pokemon } from "./pokeapi.js";

export type State = {
  readline: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: ShallowLocations["next"];
  prevLocationsURL: ShallowLocations["previous"];
  caughtPokemon: Record<string, Pokemon>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(): State {
  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const commands = getCommands();

  const pokeapi = new PokeAPI();

  return {
    readline,
    commands: getCommands(),
    pokeapi,
    nextLocationsURL: null,
    prevLocationsURL: null,
    caughtPokemon: {},
  };
}
