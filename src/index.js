require('./database/mongoose')

const express = require('express')
const cors = require('cors')
const app = express();
app.use(cors())
const router = new express.Router();
const server = app.listen(1005, () => {
    console.log('server listen to 1005')
});
const io = require('socket.io')(server, {
    path: '/mysocket/',
    cors: {
        origin: '*',
    }
    }
    );

// to delete 
// var multer = require('multer')
// const upload = multer({ dest: 'images', storage: multer.memoryStorage() });
// app.post("/upload_files", upload.single("files"), uploadFiles);
// function uploadFiles(req, res) {
//     console.log(req.file);
//     console.log(req.body.username);
//     res.json({ message: "Successfully uploaded files" });
// }


//
const signUpRouter = require('./routers/signUp')
const loginRouter = require('./routers/login')
const checkIdTokenRouter = require('./routers/checkIdToken')
const updateProfilePicture = require('./routers/updateProfilePicture')
const search = require('./routers/rooms/search')
const subscribe = require('./routers/rooms/subscribe')
const unsubscribe = require('./routers/rooms/unsubscribe')
const create = require('./routers/rooms/create')
const connectToRoom = require('./routers/rooms/connect')
const auth = require('./middleware/auth')
const join = require('./routers/rooms/join');
const send = require('./routers/send');
io.sockets.on('connection', (socket) => {
    console.log('Connection', socket.id);
    socket.emit('connected', socket.id)
    socket.on('connect-to-room', async ({idToken, roomname}) => {
        console.log(idToken, roomname);
        console.log('join');
        await connectToRoom({ io, socket, roomname})
    });
    socket.on('searchRoom', async ({ idToken, roomId }) => {
        await searchRoom({ io, socket, roomId })
    });
    socket.on('message-received-from-client', async(data) => { 
        const roomId = data.roomname
        const sender = data.sender
        const message = data.message
        console.log(data);
        await send({io, socket, roomId, sender, message})
    })

    socket.on('disconnect', () => {
        console.log('disconnect');
    });

});


app.use(express.json())

app.use(router)
app.use(signUpRouter)
app.use(loginRouter)
app.use(checkIdTokenRouter)
app.use(updateProfilePicture)
app.use(search)
app.use(subscribe)
app.use(create)
app.use(join)
app.use(unsubscribe)



