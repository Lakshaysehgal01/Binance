const { Mnemonic } = require('ethers');

require('dotenv').config();

const MNEMONIC = process.env.MNEMONIC;
module.exports = Mnemonic;