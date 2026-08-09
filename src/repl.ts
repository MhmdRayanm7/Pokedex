//The purpose of this function will be to split the user's input into "words" based on whitespace.
//  It should also lowercase the input and trim any leading or trailing whitespace

export function cleanInput(input: string): string[] {
//                                "split +1 whitespaces"
  return input.trim().toLowerCase().split(/\s+/);
}
