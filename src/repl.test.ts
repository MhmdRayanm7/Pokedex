import { cleanInput } from "./repl.js";
import { describe, expect, test } from "vitest";

// Run the same test logic with different inputs
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
  test(`Expected: ${expected}`, () => {
    // Call the function we want to test
    const actual = cleanInput(input);

    // Check that both arrays have the same length
    expect(actual).toHaveLength(expected.length);

    // Check each word
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});