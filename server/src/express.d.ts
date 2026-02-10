declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        isActivated: boolean;
      };
    }
  }
}

export {};
