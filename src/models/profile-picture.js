const mongoose = require('mongoose')

const Account = mongoose.model('profile-picture', {
    pictureBuffer: {
        type: Buffer,
        required: true,
    },

})

module.exports = Account