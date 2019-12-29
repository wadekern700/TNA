const mongoose = require('mongoose');

const guestSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  foodOption: { type: String, required: true }
});

module.exports = mongoose.model('Guests', guestSchema);
