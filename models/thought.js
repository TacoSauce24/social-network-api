const { Schema, Types } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: [ 
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
    ],
    reactions: [
      {
        type: Schema.Types.ReactionId,
        ref: 'reaction',
      }
    ],
    // reactions: [reactionSchema]
  },
  
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);


const reactionSchema = new Schema(
  {
      reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId(),
      },
      reactionBody:
      {
          type: String,
          required: true,
          maxlength: 280,
      },
      username: [
          {
              type: Schema.Types.ObjectId,
              ref: 'user',
              required: true,
          },
      ],
      createdAt: {
          type: Date,
          default: Date.now,
      },
  }
);

reactionSchema
.virtual('reaction')
.get(function () {
  return `${this.reactionId} ${this.reactionBody} ${this.username} ${this.createdAt}`
});

const Thought = model('tought', thoughtSchema)

module.exports = thoughtSchema;