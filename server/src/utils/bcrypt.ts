/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

export const encodePassword = (rawPassword: string) => {
  const SALT = genSaltSync();
  return hashSync(rawPassword, SALT);
};

export const comparePasswords = (rawPassword: string, hash: string) => {
  return compareSync(rawPassword, hash);
};
