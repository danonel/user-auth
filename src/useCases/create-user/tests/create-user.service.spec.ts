import { PrismaClient, User } from '@prisma/client';
import { MissingParamTypes, MissingParam } from '../../../errors/missing-param.error';
import { CreateUserService } from '../create-user.service';
import { CreateUserValidator } from '../create-user.validator';


describe('CreateUserService', () => {
  let prismaClient: PrismaClient;
  let createUserValidator: CreateUserValidator;
  let createUserService: CreateUserService;

  beforeEach(() => {
    prismaClient = new PrismaClient();
    createUserValidator = new CreateUserValidator(prismaClient);
    createUserService = new CreateUserService(prismaClient, createUserValidator);
  });

  afterEach(async () => {
    await prismaClient.$disconnect();
  });

  it('should create a user if userData is valid', async () => {
    const userData: User = {
      email: 'test@example.com',
      password: 'password123',
      name: 'John Doe',
      googleId: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: 1
    };
    prismaClient.user.create = jest.fn().mockResolvedValueOnce(userData);
    const result = await createUserService.createUser(userData);
    expect(result).toEqual(userData);
    expect(prismaClient.user.create).toHaveBeenCalledWith({ data: userData });
  });

  it('should return MissingParam if userData is invalid', async () => {
    const wrongUserData: User = {
      id: 1,
      email: '',
      password: 'password123',
      name: 'John Doe',
      googleId: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const error = { errorType: MissingParamTypes.MISSING_PARAMETER };

    createUserValidator.validate = jest.fn().mockReturnValue({ error });
    prismaClient.user.create = jest.fn().mockReturnValue(new MissingParam(error));
    const result = await createUserService.createUser(wrongUserData);

    if (result instanceof MissingParam) {
      expect(result.statusCode).toEqual(400);
      expect(result.message).toEqual(error.errorType);
    } 
  });
});