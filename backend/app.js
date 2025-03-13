const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { HDNodeWallet } = require("ethers");
const { mnemonicToSeedSync } = require("bip39");
const { MNEMONIC } = require('./Config.js');
const User = require('./model/User.js');

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
app.post('/signup', async (req, res) => {
    const { email, password, username } = req.body;
    const existingUser = await User.findOne({
        email: email
    });
    if (existingUser) {
        res.status(400).send("user aleready exists");
        return;
    }
    const userCnt = await User.countDocuments({});
    const userId = userCnt + 1;
    const hdNode = HDNodeWallet.fromSeed(seed);
    const wallet = hdNode.derivePath(`m/44/60/${userId}/0`);
    console.log(wallet.address);
    console.log(wallet.privateKey);
    const user = new User({
        email,
        password,
        username,
        userId,
        address: wallet.address,
        privateKey: wallet.privateKey
    })
    const u = await user.save();
    console.log(u);
    res.send('Signup success');
})

app.get('/address/:userId', async (req, res) => {
    const { userId } = req.params;
    const user = await User.findOne({
        userId: userId
    })
    if (!user) {
        res.status(404).send("User not found");
    }
    res.send("user address is " + user.address);
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})