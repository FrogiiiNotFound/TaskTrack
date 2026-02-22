import { UserRequest } from './types/userRequest';
declare global {
  namespace Express {
    interface Request {
      user?: UserRequest;
    }
  }
}

export {};
