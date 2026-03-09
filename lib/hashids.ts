/**
 * This file contains utility functions for encoding and decoding squad IDs using the Hashids library.
 * Hashids allows us to create short, unique, and non-sequential IDs that can be safely exposed in URLs.
 * The encodeSquadId function takes a numeric squad ID and returns a hashed string.
 * The decodeSquadId function takes a hashed string and returns the original numeric ID.
 * This adds a layer of obfuscation to our squad URLs, making them more user-friendly and less guessable.
 */

import Hashids from "hashids";

const hashids = new Hashids("squad-app-salt", 10);

export function encodeSquadId(id: number) {
  return hashids.encode(id);
}

export function decodeSquadId(hash: string) {
  const decoded = hashids.decode(hash);
  if (decoded.length === 0) {
    throw new Error("Ungültiger Squad-Link");
  }
  return decoded[0];
}
