import { CunstomError } from "./custom-error";

export class NotAuthorizedError extends CunstomError {
  statusCode = 401;

  constructor() {
    super('Not authorized');

    //Only because we are extending a build in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(){
    return [{ message: 'Not authorized' }]
  }
}