import readline from "node:readline";
import { getCommands } from "./commands.js";
import { initState, State } from "./state.js";

//The purpose of this function will be to split the user's input into "words" based on whitespace.
//  It should also lowercase the input and trim any leading or trailing whitespace
export function cleanInput(input: string): string[] {
  //                                "split +1 whitespaces"
  return input.trim().toLowerCase().split(/\s+/);
}

export async function startREPL(state: State) {
  state.readline.prompt();
  
  const commands = getCommands();

  state.readline.on("line",async  (input) => {
    const words = cleanInput(input);
    const commandName = words[0];
    const command = state.commands[commandName];

    if (command) {
      try {
        await command.callback(state);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Unknown command");
    }

    state.readline.prompt();
  });
}
