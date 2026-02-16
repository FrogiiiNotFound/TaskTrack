import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../config/constants';
import { TokenModel } from '../models/TokenModel';
import type { UserDto } from '../ultils/dtos/userDto';
import type { Types } from 'mongoose';

class TokenService {
  static generateTokens(payload: any) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '30d' });

    return { accessToken, refreshToken };
  }

  static async saveToken(userId: Types.ObjectId, refreshToken: string) {
    const tokenData = await TokenModel.findOne({ user: userId as any });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ user: userId as any, refreshToken });

    return token;
  }

  static validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, JWT_ACCESS_SECRET) as UserDto;

      return userData;
    } catch (e) {
      return null;
    }
  }

  static validateRefreshToken(token: string) {
    const userData = jwt.verify(token, JWT_REFRESH_SECRET);

    return userData;
  }

  static async deleteToken(token: string) {
    const deletedToken = await TokenModel.deleteOne({ refreshToken: token });

    return deletedToken;
  }

  static async findToken(refreshToken: string) {
    const token = await TokenModel.findOne({ refreshToken });

    return token;
  }
}

export default TokenService;
