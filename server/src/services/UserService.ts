import { unlinkSync } from 'fs';
import { UserModel } from '../models/UserModel';
import UserResponseDto from '../ultils/dtos/userResponseDto';
import ApiError from '../ultils/exeptions/ApiError';

class UserService {
  async getUser(userId: string) {
    const user = await UserModel.findOne({ userId });
    if (!user) throw ApiError.NotFound('Пользователь не найден');

    const userDto = new UserResponseDto(user);

    return userDto;
  }

  async updateNickname(nickname: string, userId: string) {
    const updatedUser = await UserModel.findByIdAndUpdate({ userId }, { nickname });
    if (!updatedUser) throw ApiError.NotFound('Пользователь не найден');

    const userData = new UserResponseDto(updatedUser);

    return userData;
  }

  async updateAvatar(avatarUrl: string, userId: string) {
    const updatedUser = await UserModel.findByIdAndUpdate({ userId }, { avatar_url: avatarUrl });
    if (!updatedUser) throw ApiError.NotFound('Пользователь не найден');

    const userData = new UserResponseDto(updatedUser);

    return userData;
  }

  async deleteAvatar(userId: string) {
    const user = await UserModel.findById({ userId });
    if (!user) throw ApiError.NotFound('Пользователь не найден');
    if (!user.avatar_url) throw ApiError.BadRequest('У пользователя нет аватара');

    unlinkSync(user.avatar_url);

    return UserModel.findByIdAndUpdate({ userId }, { avatar_url: null });
  }

  async activate(activationLink: string) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) throw ApiError.BadRequest('Неккоректная ссылка активации');

    user.is_activated = true;
    user.activation_link = undefined;

    await user.save();
  }
}

export default new UserService();
