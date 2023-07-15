import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const ROUNDS_OF_HAVING = 10;

export async function hashPassword(plainTextPassword: string): Promise<string> {
  try {
    return await bcrypt.hashSync(plainTextPassword, ROUNDS_OF_HAVING);
  } catch (error) {
    throw new InternalServerErrorException(error);
  }
}

export async function comparePassword(
  plainTextPassword: string,
  hash: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(plainTextPassword, hash);
  } catch (error) {
    throw new ConflictException();
  }
}
