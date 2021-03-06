const mongoose = require('mongoose')

const Account = mongoose.model('Account', {
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    idTokens: [{
        type: String,
        required: false,
    }],
    settingsToken: [{
        type: String,
        required: false,
    }],
    subscribedRooms: [{
        type: String,
        required: false,
    }],
    picture: {
        type: Buffer,
        required: false,
    }
    

})

module.exports = Account