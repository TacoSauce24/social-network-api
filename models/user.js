const { Schema, model } = require('mongoose');
const Friend = require('./Friend');

// Schema to create User model
const userSchema = new Schema(
  {
    username: String,
    email: String,
    thoughts: [Thoughts],
    friends: [ 
      {
        type: Schema.Types.ObjectId,
        ref: 'friend',
      },
    ],
  },
  {
    // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
    // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `fullName` that gets and sets the user's full name
userSchema
  .virtual('userInfo')
  // Getter
  .get(function () {
    return `${this.username} ${this.email} ${this.thoughts} ${this.friends}`;
  });

friendSchema
.virtual('friendCount')
  // Getter
  .get(function () {
    return this.friends.length;
  });

// Initialize our User model
const User = model('user', userSchema);

module.exports = User;