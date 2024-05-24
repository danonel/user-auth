import { PrismaClient } from "@prisma/client"
import { CreateUserService } from "./create-user.service";
import { CreateUserValidator } from "./create-user.validator";

export const createUserFactory = (prismaClient: PrismaClient) => {
  const createUserValidator = new CreateUserValidator(prismaClient)
  return new CreateUserService(prismaClient, createUserValidator)
}