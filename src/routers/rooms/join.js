const Message = require('../../models/message');
const Room = require('../../models/room')
const auth = require('../../middleware/auth')
const express = require('express')
const router = new express.Router();

router.post('/join', auth, async (req, res) => {
    const account = req.body.account;
    const rooms = [];
    for (let i = 0; i < account.subscribedRooms.length; i++) {
        const room = await Room.findOne({ roomname: account.subscribedRooms[i] })
        rooms.push({
            roomname: room.roomname,
            maxPlayersNumber: `${room.maxPlayersNumber}`,
            playersNumber: room.playersNumber
        })
    }
    res.send({
        rooms: rooms,
    })
})

module.exports = router;