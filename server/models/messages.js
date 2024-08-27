const mongoose = require('mongoose')
const Schema = mongoose.Schema;



const messageSchema = new Schema({
  conversationId: { type: String },
  senderId: { type: String },
  message: { type: String },
 
});

const Messages= mongoose.model('Message', messageSchema);

module.exports = Messages;
