import * as argon from "argon2";
import * as bcrypt from "bcryptjs";
import { SALT_ROUND } from "../../config/config.js";
import { hashToolEunm } from "../enum/hash.enum.js";

export async function hashvalue({ value, saltRound = SALT_ROUND, tool = hashToolEunm.BCRYPT }) {
  let hashvalue;

  switch (tool) {
    case hashToolEunm.BCRYPT:
      hashvalue = await bcrypt.hash(value, saltRound);
      break;
    case hashToolEunm.ARGON:
      hashvalue = await argon.hash(value);
      break;
    default:
      break;
  }

  return hashvalue;
}

export async function compareHash({ value, hash, tool = hashToolEunm.BCRYPT }) {
  let compareResult;

  switch (tool) {
    case hashToolEunm.BCRYPT:
      compareResult = await bcrypt.compare(value, hash);
      break;
    case hashToolEunm.ARGON:
      compareResult = await argon.verify(hash, value);
      break;
    default:
      break;
  }

  return compareResult;
}