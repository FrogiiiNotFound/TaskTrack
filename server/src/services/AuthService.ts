import type { JwtPayload } from 'jsonwebtoken';
import ApiError from '../ultils/exeptions/ApiError';
import TokenService from './TokenService';
import { UserModel } from '../models/UserModel';
import { updateUser } from '../ultils/helpers/updateUser';
import MailService from './MailService';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';

class AuthService {
  async register(email: string, password: string, avatarPath: string | null) {
    const candidate = await UserModel.findOne({ email: email });
    if (candidate) {
      throw ApiError.BadRequest('User with that email already exists');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const activationLink = v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activation_link: activationLink,
      avatar_url: avatarPath,
    });
    await MailService.sendActivationMail(email, activationLink);

    const data = await updateUser(user);

    return data;
  }

  async login(email: string, password: string) {
    const user = await UserModel.findOne({ email });
    if (!user) throw ApiError.BadRequest('User not found');

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) throw ApiError.BadRequest('Invalid password');

    const userDto = { id: user._id, email: user.email, isActivated: user.is_activated };
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      tokens,
      userDto,
    };
  }

  async logout(refreshToken: string) {
    const deletedToken = await TokenService.deleteToken(refreshToken);

    return deletedToken;
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) throw ApiError.Unauthorized;

    const userToken = TokenService.findToken(refreshToken);
    const userData = TokenService.validateRefreshToken(refreshToken) as JwtPayload;

    if (!userToken || !userData) throw ApiError.Unauthorized();

    const user = await UserModel.findOne({ _id: userData.id });

    const data = updateUser(user);

    return data;
  }

  async activate(link: string) {
    const user = UserModel.findOne({ activationLink: link });
    if (!user) throw ApiError.BadRequest('Неверная ссылка для активации');

    await UserModel.findOneAndUpdate({ activationLink: link }, { isActivated: link });
  }
}

export default new AuthService();
