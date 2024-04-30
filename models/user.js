const { Schema, model } = require('mongoose');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: [validateEmail, 'Please fill a valid email address'],
    },
    thoughts: [
      {
      type: Schema.Types.ObjectId,
      ref: 'thought',
    },
  ],
    friends: [ 
      {
        type: Schema.Types.ObjectId,
        ref: 'friend',
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

friendSchema
.virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;