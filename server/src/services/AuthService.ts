import TokenService from './TokenService';

class AuthService {
  async logout(refreshToken: string) {
    const deletedToken = await TokenService.deleteToken(refreshToken);

    return deletedToken;
  }
}

export default new AuthService();
