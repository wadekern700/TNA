const mongoose = require('mongoose');

const guestSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOption: { type: Array, required: false },
  drinking: { type: Boolean, required: false }
});

module.exports = mongoose.model('Guests', guestSchema);
