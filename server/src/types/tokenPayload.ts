import type { Schema } from 'mongoose';

export type TokenPayload = {
  user_id: Schema.Types.ObjectId;
  email: string;
  is_activated: boolean;
};
