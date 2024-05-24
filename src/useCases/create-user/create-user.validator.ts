import { PrismaClient, User } from "@prisma/client";
import { MissingParamTypes } from "../../errors/missing-param.error";

type Error = {
  errorType: MissingParamTypes;
  data: any
}

export class CreateUserValidator {
  constructor(private readonly prismaClient: PrismaClient) {}
  async validate(userData: User) {
    const errors = [] as Error[];
    return {
      data: userData,
      error: errors[0]
    };
  }
 
}