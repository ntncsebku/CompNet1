const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messageSchema = new Schema({
    from: String,
    content: String,
    time: {
        type: Date,
        default: () => new Date().toISOString()
    },
    peopleSeen: {
        type: [{
            username: String,
            time: {
                type: Date,
                default: () => new Date().toISOString()
            }
        }],
        default: []
    },
    type: {
        type: String,
        enum: ['text', 'image', 'file', 'thumbup', 'sticker', 'changeColorTheme'],
        default: 'text'
    }
});

let Message = mongoose.model('message', messageSchema);

module.exports = {  messageSchema, Message };