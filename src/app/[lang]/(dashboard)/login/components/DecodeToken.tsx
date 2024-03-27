'use server';
import jwt from 'jsonwebtoken';
export const DecodeToken = async (token: string) => {
  return await jwt.verify(token, 'Anti-D-2024');
};
