const Message = require('../../models/message');
const Room = require('../../models/room')
const auth = require('../../middleware/auth')
const express = require('express')

const router = new express.Router();

router.post('/create', auth, async (req, res) => {
    const roomname = req.body.roomname;
    const maxPlayersNumber = req.body.maxPlayersNumber;
    const rooms = await Room.find({ roomname });
    if (roomname == '') {
        res.send({
            message: `You need to provide a room id`
        })
        return;
    }
    if (rooms.length === 0) {
        const room = new Room({ roomname, maxPlayersNumber, playersNumber: 0 });
        await room.save();
        res.send({
            message: `Room ${roomname} created`
        })
        return;
    }
    res.send({
        message: `Room ${roomname} already exist`
    })
})

module.exports = router;