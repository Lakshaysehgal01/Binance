import { createRequire } from "module";
const require = createRequire(import.meta.url);
require('dotenv').config();

export const MNEMONIC = process.env.MNEMONIC;