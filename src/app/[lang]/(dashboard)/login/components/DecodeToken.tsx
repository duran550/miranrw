'use server';
import jwt from 'jsonwebtoken';
export const DecodeToken =  (token: string) => {
  return  jwt.verify(token, 'Anti-D-2024');
};
