const Message = require('../models/message');
const Room = require('../models/room')

const send = async ({ io, socket, roomId, sender, message }) => {
    try {
        const newMessage = new Message({ message, sender })
        await newMessage.save();
        console.log(newMessage);
        const room = await Room.findOne({ roomname: roomId });
        room.messages = room.messages.concat(newMessage);
        await room.save();
        console.log(room);
        io.to(roomId).emit('message-received-from-server', { sender, message })
    } catch (err) {
        console.log(err);
    }
  
}

module.exports = send;