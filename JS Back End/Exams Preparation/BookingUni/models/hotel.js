const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  city: {
    type: String,
    required: true,
    minlength: 3,
  },
  imageUrl: {
    type: String,
    required: true,
    validate: /^https?/,
  },
  rooms: {
    type: Number,
    required: true,
    min: 1,
    max: 100,
  },
  booked: [{ type: Types.ObjectId, ref: 'user' }],
  owner: {
    type: Types.ObjectId,
    ref: 'user',
  },
});

module.exports = new mongoose.model('hotel', hotelSchema);
