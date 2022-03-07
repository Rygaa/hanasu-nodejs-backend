const Message = require('../../models/message');
const Room = require('../../models/room')
const auth = require('../../middleware/auth')
const express = require('express')
const router = new express.Router();

router.post('/subscribe', auth, async (req, res) => {
    const account = req.body.account;
    const roomname = req.body.roomname;
    if (roomname == '') {
        res.send({
            message: `You need to provide a room id`
        })
    }
    const isAlreadySubscribed = await isUserAlreadySubscribed({ roomname, userRooms: account.subscribedRooms})
    if (isAlreadySubscribed) {
        res.send({
            message: `You are already subscribed`
        })
        return;
    }
    const room = await Room.findOne({ roomname});
    account.subscribedRooms = account.subscribedRooms.concat(room.roomname);
    await account.save();
    res.send({
        message: `subscribed to ${roomname}`
    })
})

const isUserAlreadySubscribed = async ({ roomname, userRooms}) => {
    for (let i = 0; i < userRooms.length; i++) {
        if (roomname == userRooms[i]) {
            return true;
        }
    }
    return false;
}

module.exports = router;