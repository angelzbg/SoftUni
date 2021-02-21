const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const expenseSchema = new mongoose.Schema({
  merchant: {
    type: String,
    required: true,
    minlength: 4,
  },
  total: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30,
  },
  report: {
    type: Boolean,
    required: true,
    default: false,
  },
  //booked: [{ type: Types.ObjectId, ref: 'user' }],
  user: {
    type: Types.ObjectId,
    ref: 'user',
    required: true,
  },
});

module.exports = new mongoose.model('expense', expenseSchema);
