const { Schema, model } = require('mongoose');
const Response = require('./Response');

// Schema to create Post model
const friendSchema = new Schema(
  {
    username: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Initialize our Friend model
const Friend = model('friend', friendSchema);

module.exports = Friend;