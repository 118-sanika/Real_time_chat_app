const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  members: {
    type: Array,
    required: true
  }
});

const Conversations = mongoose.model('Conversations', conversationSchema);

module.exports = Conversations;
