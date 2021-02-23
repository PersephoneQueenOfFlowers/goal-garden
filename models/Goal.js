const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoalSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  body: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  // expirationDate: {
  //   type: Date
  // },
  // avatar: {
  //   type: Number,
  //   required: true
  // },
  // checkInterval: {
  //   type: Number,
  //   min: 1,
  //   max: 365,
  //   required: true
  // },
  // active: {
  //   type: Boolean,
  //   required: true
  // },
  // count: {
  //   type: Number,
  //   default: 0
  // },
  // streak: {
  //   type: Number,
  //   default: 0
  // }
},{
  timestamps: true  
});

const Goal = mongoose.model('Goal', GoalSchema);
module.exports = Goal;