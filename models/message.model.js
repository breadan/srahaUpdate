import { Schema, model, SchemaTypes } from 'mongoose';

const messageSchema = new Schema(
  {
    message: {
      type: 'string',
      required: true,
    },
    // user:{type: SchemaTypes.ObjectId,ref: "User"},
    receivedId: SchemaTypes.ObjectId,
    senderId: SchemaTypes.ObjectId,
  },
  { timestamps: true }
);
