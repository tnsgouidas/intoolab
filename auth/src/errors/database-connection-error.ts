import { CunstomError } from "./custom-error";

export class DatabaseConnectionnError extends CunstomError {
  statusCode = 500;
  reason = 'Error connecting to database';

  constructor() {
    super('Error connencting to db');

    //Only because we are extending a build in class
    Object.setPrototypeOf(this, DatabaseConnectionnError.prototype);
  }

  serializeErrors(){
    return [
      { message: this.reason }
    ]
  }
}