import type { State } from "./state.js";

export async function commandExplore(
  state: State,
  ...args: string[]
): Promise<void> {
  const locationName = args[0];

  if (!locationName) {
    console.log("Please provide a location area.");
    return;
  }

  console.log(`Exploring ${locationName}...`);
  const location = await state.pokeapi.fetchLocation(locationName);

  console.log("Found Pokemon:");

  location.pokemon_encounters.forEach((pe) => {
    console.log(` - ${pe.pokemon.name}`);
  });
}
