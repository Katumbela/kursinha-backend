/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';

export class HashUtil {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  static async comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
