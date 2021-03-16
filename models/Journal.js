const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JournalSchema = new Schema ({
  goal: {
    type: Schema.Types.ObjectId,
    ref: "goals"
  },
  highlights: {
    type: String
  },
  body: {
    type: String,
    required: true
  },
  success: {
    type: Boolean,
    default: false
  },
  media: {
    type: Array
  },
  goalState: {
    type: Number,
    default: 0
  },
  cues: {
    type: Array
  },
  rewards: {
    type: Array
  },
  editable: {
    type: Boolean,
    default: false
  }
},{
  timestamps: true
})
const Journal = mongoose.model('Journal', JournalSchema);
module.exports = Journal;