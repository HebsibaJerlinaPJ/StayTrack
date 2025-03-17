const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  type: { type: String, required: true },
  floor: { type: String, required: true },
  bed: { type: String, required: true },
  capacity: { type: Number, required: true },
  availability: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Room', RoomSchema);