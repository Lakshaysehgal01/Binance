import { createRequire } from "module";
const require = createRequire(import.meta.url);
const express = require('express');
const app = express();
const mongoose = require('mongoose');
import { mnemonicToSeedSync } from "bip39";
import { HDNodeWallet } from "ethers";
import { MNEMONIC } from './Config.js';

const port = 8080;
main()
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Binance');

}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const seed = mnemonicToSeedSync(MNEMONIC);
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    const userId = 1;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const wallet = hdNode.derivePath(`m/44/60/${userId}/0`);
    console.log(wallet);
    console.log(wallet.address);
    console.log(wallet.privateKey);
    res.send('Signup success');
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})