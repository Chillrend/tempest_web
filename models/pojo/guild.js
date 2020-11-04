const mongoose = require('mongoose');

const { Schema } = mongoose;

const guildSchema = new Schema({
  guildId: Number,
  name: String,
  eventWebhookUrl: String,
  coloWebhookUrl: String,
  tier: String,
  tierWL: {
    wins: Number,
    losses: Number,
  },
  totalWL: {
    wins: Number,
    losses: Number,
  },
});

const Guild = mongoose.model('Guild', guildSchema);

module.exports = Guild;
