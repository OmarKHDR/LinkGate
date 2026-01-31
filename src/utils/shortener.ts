import { nanoid } from 'nanoid';

export const generateShortId = (i: number) => {
  return nanoid(8 + i);
};
