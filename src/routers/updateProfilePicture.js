const express = require('express')
const router = new express.Router();
const Account = require('../models/account')
var multer = require('multer')
const upload = multer({ dest: 'images', storage: multer.memoryStorage() });
const auth = require('../middleware/auth')
const jwt = require('jsonwebtoken');

router.post('/updateProfilePhoto', upload.single("files"), auth, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password
    const picture = req.file.buffer;
    const account = req.body.account;
    const idToken = req.body.idToken;
    account.picture = picture;
    await account.save();
    res.send({
        message: 'Account created'
    })
})

router.post('/updateProfile', auth, async (req, res) => {
    const account = req.body.account;
    account.username = req.body.username;
    account.email = req.body.email;
    console.log('account: ', req.body.username);
    console.log('account: ', req.body.email);
    await account.save();
})

router.post('/access-settings', upload.single("files"), auth, async (req, res) => {
    const account = req.body.account;
    const doesPasswordMatches = (account.password === req.body.password)
    console.log(doesPasswordMatches);
    if (doesPasswordMatches) {
        req.body.newUsername ? account.username = req.body.newUsername : null;
        req.body.newEmail ? account.email = req.body.newEmail : null;
        req.body.newPassword ? account.password = req.body.newPassword : null;
        req.file ? account.picture = req.file.buffer : null;
        await account.save();
        res.send({
            message: 'Your profile got updated',
            username: account.username,
            email: account.email,
        })
        return;
    } else {
        res.send({
            error: 'Wrong password',
        })
    }
})



const getAccountByUsername = async username => {
    const account = await Account.findOne({ username })
    return account;
}

module.exports = router