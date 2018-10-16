const { User } = require('../models/User');
const { Message } = require('../models/Message');
const { Room } = require('../models/Room');


const saveMessage = async (req, res) => {
    const { roomId } = req.params;
    const { content, type } = req.body;
    const { username } = req;
    
    console.log('save');
    try {
        let room = await Room.findById(roomId);
        if (!room) return res.status(404).send('Room not found.');
        else await room.update({
            $push: {
                messages: { $each: [{ from: username, content, type }] }
            }
        });

        // Delete room and append it at then end of rooms array
        User.updateOne({ username }, { $pull: { rooms: room._id } }, function () {
            User.updateOne({ username }, { $addToSet: { rooms: room._id } }, function () {
                let roomMembers = room.users;
                roomMembers.forEach(member => {
                    if (member !== username) {
                        // Delete room and append it at then end of rooms array
                        User.updateOne({ username: member }, { $pull: { rooms: room._id } }, function () {
                            User.updateOne({ username: member }, { $addToSet: { rooms: room._id } }, function () {
                                res.status(200).send('Save message successfully.');
                            });
                        });
                    }
                });
            });
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal server error.');
    }
}

const getMessages = async (req, res) => {
    const { roomId } = req.params;
    const { count } = req.query;
    let room = await Room.findById(roomId);
    if (room) {
        if (count === undefined || room.messages.length < count) return res.status(200).send(room.messages);
        else return res.status(200).send(room.messages.slice(room.messages.length - count));
    }
    else return res.status(404).send('Room not found.');
}

const deleteMessages = async (req, res) => {
    const { roomId } = req.params;
    try {
        await Room.findByIdAndUpdate(roomId, { $set: { messages: [] } });
        return res.status(200).send('Delete room messages successfully.');
    } catch (e) {
        console.log(e);
        return res.status(500).send('Internal server error.');
    }
}
module.exports = { getMessages, saveMessage, deleteMessages };