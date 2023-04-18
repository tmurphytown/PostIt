import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/users.js';

export const SECRET = 'Be brave enough to be bad at something new.';

export const hashPassword = async (plainTextPassword: string) => {
    const saltRound = 12;
    const hash = await bcrypt.hash(plainTextPassword, saltRound);
    return hash;
}

export const comparePasswords = async (plainTextPassword: string, hashPassword: string) => {
    return await bcrypt.compare(plainTextPassword, hashPassword);
}

export const signUserToken = async (user: User) => {
    let token = jwt.sign(
        { userId: user.userId },
        SECRET,
        { expiresIn: '3hrs' }
    );
    return token;
}

export const verifyUser = async (req: Request) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            let decoded: any = await jwt.verify(token, SECRET);
            return await User.findByPk(decoded.userId);
        }
        catch (err) {
            console.log(err)
            return null;
        }
    }
    else {
        return null;
    }
}