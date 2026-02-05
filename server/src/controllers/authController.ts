import type { NextFunction, Response, Request } from 'express';
import { matchedData, validationResult } from 'express-validator';
import { User } from '../models/UserModel';
import ApiError from '../ultils/exeptions/ApiError';

export const authController = {
  registerUser: async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send(400).json({ errors: errors.array() });
    }
    const body = matchedData(req);

    const candidate = await User.findOne({ email: body.email });
    if (candidate) {
      throw ApiError.BadRequest('User with that email already exists');
    }

    const user = new User({
      ...body,
    });
    await user.save();

    return res.send(200).json({});
  },
  loginUser: async () => {},
};
