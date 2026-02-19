import type { UserDocument } from '../../models/UserModel';

class UserResponseDto {
  public user_id: string;
  public email: string;
  public nickname: string | undefined;
  public is_activated: boolean;
  public avatar_url: string | undefined;

  constructor(model: UserDocument) {
    this.user_id = model._id.toString();
    this.email = model.email;
    this.nickname = model.nickname;
    this.is_activated = model.is_activated;
    this.avatar_url = model.avatar_url;
  }
}

export default UserResponseDto;
