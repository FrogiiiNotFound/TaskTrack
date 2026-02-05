class ApiError<T = unknown> extends Error {
  public status?: number;
  public errors: T[];

  constructor(message: string, status: number, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static Unauthorized() {
    throw new ApiError('User not authorized', 401);
  }

  static BadRequest(message: string, errors = []) {
    throw new ApiError(message, 400, errors);
  }
}

export default ApiError;
