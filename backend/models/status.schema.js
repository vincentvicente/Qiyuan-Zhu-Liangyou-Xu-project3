const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true, maxlength: 280 },
  timestamp: { type: Date, default: Date.now }, // 时间戳
});

module.exports = StatusSchema;
