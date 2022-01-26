const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    browserName: {
        type: String,
        required: true
    },
    osName: {
        type: String,
        required: true
    },
    isDesktop: {
        type: Boolean,
        required: true,
        default: false
    },
    isTablet: {
        type: Boolean,
        required: true,
        default: false
    },
    isMobileOnly: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    ip: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model('userDetails', userSchema);
