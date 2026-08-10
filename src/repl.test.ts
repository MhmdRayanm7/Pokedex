import { describe, expect, test } from "vitest";
import { cleanInput } from "./repl.js";
import { Cache } from "./pokecache.js";

// Test cleanInput with different inputs
describe.each([
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "Charmander Bulbasaur PIKACHU",
    expected: ["charmander", "bulbasaur", "pikachu"],
  },
  {
    input: "   ONE   TWO   THREE   ",
    expected: ["one", "two", "three"],
  },
])("cleanInput($input)", ({ input, expected }) => {
  test(`returns ${expected}`, () => {
    const actual = cleanInput(input);

    expect(actual).toHaveLength(expected.length);

    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});


// Test storing and removing cached values
test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500,
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000,
  },
])("cache works with $interval ms interval", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  // Add value to cache
  cache.add(key, val);

  // Check value exists
  const cached = cache.get(key);
  expect(cached).toBe(val);

  // Wait for cache to expire
  await new Promise((resolve) => setTimeout(resolve, interval * 2));

  // Check value was removed
  const reaped = cache.get(key);
  expect(reaped).toBeUndefined();

  cache.stopReapLoop();
});


// Test missing cache keys
test.each([
  ["missing-key"],
  ["https://example.com/not-found"],
])("returns undefined for missing key: %s", (key) => {
  const cache = new Cache(1000);

  expect(cache.get(key)).toBeUndefined();

  cache.stopReapLoop();
});


// Test that PokeAPI response objects are stored and returned correctly
test.concurrent.each([
  {
    key: "https://pokeapi.co/api/v2/location-area",
    val: {
      count: 2,
      next: "https://pokeapi.co/api/v2/location-area?offset=20",
      previous: null,
      results: [
        {
          name: "canalave-city-area",
          url: "https://pokeapi.co/api/v2/location-area/1/",
        },
        {
          name: "eterna-city-area",
          url: "https://pokeapi.co/api/v2/location-area/2/",
        },
      ],
    },
  },
  {
    key: "https://pokeapi.co/api/v2/location-area/1",
    val: {
      id: 1,
      name: "canalave-city-area",
      pokemon_encounters: [],
    },
  },
])("stores PokeAPI data for $key", ({ key, val }) => {
  const cache = new Cache(1000);

  cache.add(key, val);

  const cached = cache.get(key);

  expect(cached).toEqual(val);

  cache.stopReapLoop();
});