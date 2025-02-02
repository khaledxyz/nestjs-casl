import { genSalt, hash } from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 14;
    const salt = await genSalt(saltRounds);
    return hash(password, salt);
}