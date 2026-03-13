/**
 * This file contains utility functions for encoding and decoding squad IDs using the Hashids library.
 * Hashids allows us to create short, unique, and non-sequential IDs that can be safely exposed in URLs.
 * The encodeSquadId function takes a numeric squad ID and returns a hashed string.
 * The decodeSquadId function takes a hashed string and returns the original numeric ID.
 * This adds a layer of obfuscation to our squad URLs, making them more user-friendly and less guessable.
 */

import Hashids from "hashids";

const hashids = new Hashids("squad-app-salt", 10);

/**
 * Encodes a numeric squad ID into a hashed string using Hashids.
 * @param id The numeric squad ID to encode.
 *  @returns A hashed string representation of the squad ID.
 * @throws Error if the encoding process fails.
 */
export function encodeSquadId(id: number) {
  return hashids.encode(id);
}

/**
 * Decodes a hashed squad ID back into its original numeric form.
 * @param hash The hashed squad ID to decode.
 * @returns The original numeric squad ID.
 * @throws Error if the decoding process fails or if the hash is invalid.
 */
export function decodeSquadId(hash: string) {
  const decoded = hashids.decode(hash);
  if (decoded.length === 0) {
    throw new Error("Invalid Squad Link");
  }
  return decoded[0];
}
