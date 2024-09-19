import mongoose, { Schema, model } from 'mongoose';

const tokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 900,
  },
  new_password: {
    type: String,
    required: true
  }

});

export const TokenEmail =
    mongoose.models.TokenEmail || mongoose.model<any>('TokenEmail', tokenSchema);