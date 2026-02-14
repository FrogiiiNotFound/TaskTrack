import type { ValidationError } from 'zod-validation-error';

type ApiErrors = ValidationError | string[] | null;

class ApiError<T = ApiErrors> extends Error {
  public status?: number;
  public errors: T;

  constructor(message: string, status: number, errors: T) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static Unauthorized() {
    throw new ApiError('User not authorized', 401, null);
  }

  static BadRequest(message: string, errors: ApiErrors = null) {
    throw new ApiError(message, 400, errors);
  }
}

export default ApiError;
