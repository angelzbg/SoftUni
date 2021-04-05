const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const FriendRequestSchema = new mongoose.Schema({
  sender: { type: Types.ObjectId, required: true, ref: 'User' },
  receiver: { type: Types.ObjectId, required: true, ref: 'User' },
  created: { type: Number, required: true },
});

module.exports = mongoose.model('FriendRequest', FriendRequestSchema);
