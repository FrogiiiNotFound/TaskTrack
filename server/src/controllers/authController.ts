import type { NextFunction, Response, Request } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { User } from '../models/UserModel';
import ApiError from '../ultils/exeptions/ApiError';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import TokenService from '../services/TokenService';
import { API_URL } from '../config/constants';
import MailService from '../services/MailService';
import AuthService from '../services/AuthService';

export const authController = {
  registerUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = matchedData(req);

      const candidate = await User.findOne({ email: email });
      if (candidate) {
        throw ApiError.BadRequest('User with that email already exists');
      }

      const hashPassword = await bcrypt.hash(password, 10);
      const activationLink = v4();

      const user = await User.create({
        email,
        password: hashPassword,
        activationLink,
      });

      const fullActivationLink = `${API_URL}/api/v1/activate/${activationLink}`;
      await MailService.sendActivationMail(email, fullActivationLink);

      const userDto = { id: user._id, email: user.email, isActivated: user.isActivated };
      const tokens = TokenService.generateTokens({ ...userDto });

      await TokenService.saveToken(userDto.id, tokens.refreshToken);

      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      return res.status(201).json({
        ...tokens,
        user: userDto,
      });
    } catch (e) {
      next(e);
    }
  },
  loginUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = matchedData(req);

      const user = await User.findOne({ email });
      if (!user) throw ApiError.BadRequest('User not found');

      const isMatch = bcrypt.compareSync(password, user.password);
      if (!isMatch) throw ApiError.BadRequest('Invalid password');

      const userDto = { id: user._id, email: user.email, isActivated: user.isActivated };
      const tokens = TokenService.generateTokens({ ...userDto });

      await TokenService.saveToken(userDto.id, tokens.refreshToken);

      res.cookie('refreshToken', tokens.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      return res.status(200).json({
        ...tokens,
        user: userDto,
      });
    } catch (e) {
      next(e);
    }
  },
  logoutUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      const token = await AuthService.logout(refreshToken);

      res.clearCookie(refreshToken);

      res.status(200).json(token);
    } catch (e) {
      next(e);
    }
  },
  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = await AuthService.refresh(refreshToken);

      res.cookie('refreshToken', userData.tokens.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 30,
        httpOnly: true,
      });

      res.status(200).json({
        user: userData.user,
        accessToken: userData.tokens.accessToken,
      });
    } catch (e) {
      next(e);
    }
  },
  activate: async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (e) {
      next(e)
    }
  },
};
