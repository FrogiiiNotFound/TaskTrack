import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 20,
  },
  nickname: {
    type: String,
    required: false,
    minLength: 3,
    maxLength: 32,
  },
  isActivated: {
    type: String,
    required: false,
    default: false,
  },
  activationLink: {
    type: String,
    required: false,
  },
  avatarUrl: {
    type: String,
    required: false,
  },
});

export const User = mongoose.model('User', UserSchema);
