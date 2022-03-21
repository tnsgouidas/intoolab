import { CunstomError } from "./custom-error";

export class NotFoundError extends CunstomError {
  statusCode = 404;

  constructor(){
    super('Route not found');

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() { 
    return [{ message:'Not Found' }]
  }

}