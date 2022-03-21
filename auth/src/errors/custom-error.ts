export abstract class CunstomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super();

    //Only because we are extending a build in class
    Object.setPrototypeOf(this, CunstomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}