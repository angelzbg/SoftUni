const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const MessageSchema = new mongoose.Schema({
  chatId: { type: String },
  sender: { type: Types.ObjectId, ref: 'User' },
  created: { type: Number, required: true },
  content: { type: String, minlength: 1, maxlength: 1000 },
});

module.exports = mongoose.model('Message', MessageSchema);
