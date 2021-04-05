const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const ProfileCommentSchema = new mongoose.Schema({
  userId: { type: Types.ObjectId, required: true, ref: 'User' },
  likes: [{ type: Types.ObjectId, ref: 'User' }],
  dislikes: [{ type: Types.ObjectId, ref: 'User' }],
  accountId: { type: Types.ObjectId, required: true, ref: 'User' },
  created: { type: Number, required: true },
  content: { type: String, required: true, minlength: 10, maxlength: 255 },
});

module.exports = mongoose.model('ProfileComment', ProfileCommentSchema);
