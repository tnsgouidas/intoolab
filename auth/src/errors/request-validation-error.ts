import { ValidationError } from "express-validator";
import { CunstomError } from "./custom-error";

export class RequestValidationError extends CunstomError {
  statusCode = 500;

  constructor(public errors: ValidationError[]) {
    super('invalid request parameters');

    //Only because we are extending a build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(){
    return this.errors.map( err =>{
      return { message: err.msg, field: err.param }
    })
  }
}