import { BaseError, BaseErrorInterface } from "./app-error";

export enum MissingParamTypes {
  INVALID_INPUT = "Invalid input provided.",
  MISSING_PARAMETER = "Required parameter is missing.",
  INVALID_FORMAT = "Invalid data format",
}

export class MissingParam extends BaseError {
  constructor(error: BaseErrorInterface<MissingParamTypes>) {
    const errorMessages: { [key in MissingParamTypes]: string } = {
      [MissingParamTypes.INVALID_INPUT]: "Invalid input provided.",
      [MissingParamTypes.MISSING_PARAMETER]: "Required parameter is missing.",
      [MissingParamTypes.INVALID_FORMAT]: "Invalid data format.",
      // Add more error messages as needed
    };
    const message = errorMessages[error.errorType] || "Bad request.";
    super(message, 400, error.data);
  }
}