const Message = require('../../models/message');
const Room = require('../../models/room')
const auth = require('../../middleware/auth')
const express = require('express')

const router = new express.Router();
let ui = 0;
router.post('/search', auth, async (req, res) => {
    const roomname = req.body.roomname;
    const arr = []
    if (roomname == '') {
        res.send({
            message: `put some search`,
            rooms: arr,
        })
        return;
    }
    const rooms = await Room.find({});
    for (let i = 0; i < rooms.length; i++) {
        console.log(rooms[i].roomname);
        console.log(roomname);
        console.log('======');
        if (rooms[i].roomname.includes(roomname)) {
            console.log(rooms[i].roomname);
            arr.push({
                roomname: rooms[i].roomname,
                maxPlayersNumber: `${rooms[i].maxPlayersNumber}`,
                playersNumber: rooms[i].playersNumber
            })
        }
    }
    console.log(arr);
    res.send({
        message: `rooms received ${ui++}`,
        rooms: arr,
    })
})

module.exports = router;