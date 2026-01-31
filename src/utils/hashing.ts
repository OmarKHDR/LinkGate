/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import bcrypt from 'bcrypt';

export const hashPassword = (plain: string): string => bcrypt.hash(plain, 10);

export const verifyPassword = (plain: string, hash: string): boolean =>
  bcrypt.compare(plain, hash);
