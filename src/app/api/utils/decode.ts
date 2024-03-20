import jwt from 'jsonwebtoken';

export const decode = (token: string) => {
    return jwt.decode(token) as any;
}

export const verify = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
}