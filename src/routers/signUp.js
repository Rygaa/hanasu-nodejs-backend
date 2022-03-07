const express = require('express')
const router = new express.Router();
const Account = require('../models/account')
var fs = require('fs');
const fsPromises = fs.promises;

router.post('/signUp', async (req, res) => {
    const picture = await fsPromises.readFile(`${__dirname}/../images/img.png`);
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    console.log(username);
    console.log(password);
    const account = await Account.findOne({ username })
    if (account) {
        res.send({ error: 'Account already exist' })
        return;
    }

    const newAccount = new Account({ username, password, email, picture})
    await newAccount.save();
    res.send({ message: 'Account created' })
})  

const getAccountByUsername = async username => {
    const account = await Account.findOne({username})
    return account;
}

module.exports  = router