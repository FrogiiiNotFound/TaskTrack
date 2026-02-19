import mongoose, { Document, Schema } from 'mongoose';

interface IToken extends Document {
  user: Schema.Types.ObjectId;
  refresh_token: string;
}

const TokenSchema = new mongoose.Schema<IToken>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    require: true,
  },
  refresh_token: {
    type: String,
    require: true,
  },
});

export const TokenModel = mongoose.model<IToken>('Token', TokenSchema);
