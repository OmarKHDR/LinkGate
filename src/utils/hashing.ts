/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import bcrypt from 'bcrypt';

export const hashPassword = async (plain: string): Promise<string> => {
  return await bcrypt.hash(plain, 10);
};

export const verifyPassword = async (
  plain: string,
  hash: string,
): Promise<boolean> => {
  return await bcrypt.compare(plain, hash);
};
