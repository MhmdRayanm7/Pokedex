import type { State } from "./state.js";

export async function commandPokedex(state: State) {
  console.log("Your Pokedex:");

  Object.values(state.caughtPokemon).forEach((pokemon) => {
    console.log(` - ${pokemon.name}`);
  });
}