import type { JwtPayload } from 'jsonwebtoken';
import ApiError from '../ultils/exeptions/ApiError';
import TokenService from './TokenService';
import { User } from '../models/UserModel';
import { updateUser } from '../ultils/helpers/updateUser';

class AuthService {
  async logout(refreshToken: string) {
    const deletedToken = await TokenService.deleteToken(refreshToken);

    return deletedToken;
  }
  async refresh(refreshToken: string) {
    if (!refreshToken) throw ApiError.Unauthorized;

    const userToken = TokenService.findToken(refreshToken);
    const userData = TokenService.validateRefreshToken(refreshToken) as JwtPayload;

    if (!userToken || !userData) throw ApiError.Unauthorized();

    const user = await User.findOne({ _id: userData.id });

    const data = updateUser(user);

    return data;
  }
}

export default new AuthService();
