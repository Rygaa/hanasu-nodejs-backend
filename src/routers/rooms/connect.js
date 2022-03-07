const Message = require('../../models/message');
const Room = require('../../models/room')

const connectToRoom = async ({ io, socket, roomname }) => {
    console.log("roomname", roomname);
    const room = await Room.findOne({ roomname });
    socket.join(roomname);
    socket.emit('joined', roomname);
    await sendMessage(socket, room)
}

const sendMessage = async (socket, room) => {
    if (room.messages == undefined) {
        return;
    } else if (room.messages.length < 50) {
        for (let i = 0; i < room.messages.length; i++) {
            const _id = room.messages[i];
            const message = await Message.findById(_id);
            socket.emit('message-received-from-server', {
                sender: message.sender,
                message: message.message
            })
        }
    } else {
        for (let i = 0; i < 25; i++) {
            const _id = room.messages[room.messages.length - 50 + i];
            const message = await Message.findById(_id);
            socket.emit('message-received-from-server', {
                sender: message.sender,
                message: message.message
            })
        }
    }

}

module.exports = connectToRoom;