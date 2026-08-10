import readline from "node:readline";

//The purpose of this function will be to split the user's input into "words" based on whitespace.
//  It should also lowercase the input and trim any leading or trailing whitespace
export function cleanInput(input: string): string[] {
  //                                "split +1 whitespaces"
  return input.trim().toLowerCase().split(/\s+/);
}

export function startREPL() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  rl.prompt();

  //parse the input into an array
  rl.on("line", (input) => {
    const words = cleanInput(input);
    if(!words){
      rl.prompt();
    }
    else{
        console.log(`Your command was: ${words[0]}`)
    }
    rl.prompt();
    
  });

}
