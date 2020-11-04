const mongoose = require('mongoose');

const { Schema } = mongoose;

const lifeforceChildSchema = new Schema({
  outcome: {
    type: String,
    enum: ['victory', 'defeat'],
  },
  ours: {
    type: Number,
  },
  theirs: {
    type: Number,
  },
});

const comboChildSchema = new Schema({
  ours: {
    type: Number,
  },
  theirs: {
    type: Number,
  },
});

const shinmaChildSchema = new Schema([
  {
    weapon: [String],
    result: {
      ours: Number,
      theirs: Number,
    },
  },
]);

const colosseumSchema = new Schema({
  colo_type: {
    type: String,
    enum: ['Colosseum', 'Gran Colosseum', 'Blood Colosseum'],
  },
  rival: String,
  lifeforce: lifeforceChildSchema,
  combo: comboChildSchema,
  shinma: shinmaChildSchema,
}, {
  timestamp: true,
});

const Colosseum = mongoose.model('Colosseum', colosseumSchema);

module.exports = Colosseum;
