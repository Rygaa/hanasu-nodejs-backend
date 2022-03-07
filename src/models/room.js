const mongoose = require('mongoose')

const Room = mongoose.model('Room', {
    roomname: {
        type: String,
        required: true
    },
    maxPlayersNumber: {
        type: String,
        required: true,
    },
    playersNumber: {
        type: String,
        required: true,
    },
    messages: [
        {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Message',
        }

    ]
})

module.exports = Room
