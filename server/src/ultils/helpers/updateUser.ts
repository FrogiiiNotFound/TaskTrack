import TokenService from '../../services/TokenService';

export const updateUser = async (user: any) => {
  const userDto = { id: user._id, email: user.email, isActivated: user.isActivated };
  const tokens = await TokenService.generateTokens(userDto);

  await TokenService.saveToken(userDto.id, tokens.refreshToken);

  return {
    user: userDto,
    tokens,
  };
};
