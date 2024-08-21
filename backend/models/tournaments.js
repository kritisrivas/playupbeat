const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const tournamentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  creator: {type: mongoose.Types.ObjectId, required: true, ref: 'User'}
}, { timestamps: true });

tournamentSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Tournament', tournamentSchema);
