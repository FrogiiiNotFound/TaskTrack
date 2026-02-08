import { User } from '../models/UserModel';
import ApiError from '../ultils/exeptions/ApiError';

class UserService {
  async activate(activationLink: string) {
    const user = await User.findOne({ activationLink });
    if (!user) throw ApiError.BadRequest('Неккоректная ссылка активации');

    user.isActivated = true;
    user.activationLink = undefined;

    await user.save();
  }
}

export default new UserService();
