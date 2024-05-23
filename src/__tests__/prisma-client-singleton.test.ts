import { PrismaClient } from '@prisma/client';
import { PrismaClientSingleton } from '@/database/prisma';

jest.mock('@prisma/client', () => {
  const mPrismaClient = {
    $connect: jest.fn(),
    $disconnect: jest.fn(),
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

describe('PrismaClientSingleton', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Manually reset the singleton instance
    PrismaClientSingleton['instance'] = undefined as any;
  });

  it('should create an instance of PrismaClient', () => {
    const prisma = PrismaClientSingleton.getInstance();
    expect(prisma).toBeDefined();
    expect(PrismaClient).toHaveBeenCalledTimes(1);
  });

  it('should return the same instance of PrismaClient on subsequent calls', () => {
    const prismaFirstInstance = PrismaClientSingleton.getInstance();
    const prismaSecondInstance = PrismaClientSingleton.getInstance();
    expect(prismaFirstInstance).toBe(prismaSecondInstance);
    expect(PrismaClient).toHaveBeenCalledTimes(1);
  });
});
