import mongoose, { type HydratedDocument } from 'mongoose';

export interface IUser {
  email: string;
  password: string;
  nickname?: string;
  is_activated: boolean;
  activation_link?: string | null;
  avatar_url?: string | null;
}

export type UserDocument = HydratedDocument<IUser>;

const UserSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: false,
    minLength: 3,
    maxLength: 32,
    default: null,
  },
  is_activated: {
    type: Boolean,
    default: false,
  },
  activation_link: {
    type: String,
    default: null,
  },
  avatar_url: {
    type: String,
    required: false,
    default: null,
  },
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);