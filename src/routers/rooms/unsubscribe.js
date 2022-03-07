const Message = require('../../models/message');
const Room = require('../../models/room')
const auth = require('../../middleware/auth')
const express = require('express')
const router = new express.Router();

router.post('/unsubscribe', auth, async (req, res) => {
    const account = req.body.account;
    const roomname = req.body.roomname;
    if (roomname == '') {
        console.log(`You need to provide a room id`);
        res.send({
            message: `You need to provide a room id`
        })
    }
    const isAlreadySubscribed = await isUserAlreadySubscribed({ roomname, userRooms: account.subscribedRooms })
    if (!isAlreadySubscribed) {
        console.log(`You are not already subscribed`);
        res.send({
            message: `You are not already subscribed`
        })
        return;
    }
    const room = await Room.findOne({ roomname });
    console.log(room);
    const index = account.subscribedRooms.indexOf(room.roomname);
    if (index > -1) {
        account.subscribedRooms.splice(index, 1);
    }
    await account.save();
    console.log(`unsubscribed to ${roomname}`);

    const rooms = [];
    for (let i = 0; i < account.subscribedRooms.length; i++) {
        const x = await Room.findOne({ roomname: account.subscribedRooms[i] })
        rooms.push({
            roomname: x.roomname,
            maxPlayersNumber: `${x.maxPlayersNumber}`,
            playersNumber: x.playersNumber
        })
    }


    res.send({
        rooms,
        message: `unsubscribed to ${roomname}`
    })
})

const isUserAlreadySubscribed = async ({ roomname, userRooms }) => {
    for (let i = 0; i < userRooms.length; i++) {
        if (roomname == userRooms[i]) {
            return true;
        }
    }
    return false;
}

module.exports = router;