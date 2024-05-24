import { PrismaClient, User } from '@prisma/client';
import { CreateUserValidator } from './create-user.validator';
import { MissingParam, MissingParamTypes } from '../../errors/missing-param.error';

export class CreateUserService {
  constructor(private readonly prismaClient: PrismaClient, private readonly createUserValidator: CreateUserValidator) {
  }

  async createUser(userData: User): Promise<User | MissingParam> {
    const { data, error } = await this.createUserValidator.validate(userData);
    if (error?.errorType in MissingParamTypes) {
      return new MissingParam(error)
    }
    const user = await this.prismaClient.user.create({
      data
    });

    return user
  }
}
