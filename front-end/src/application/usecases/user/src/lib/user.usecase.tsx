import { User } from '@front-end/domain/entities/user';

export interface UserUseCase {
  getUser(id: string): Promise<User>;
  login(phoneNumber: string, password: string): Promise<User>;
  verifyPhoneNumber(phoneNumber: string): Promise<boolean>;
  register(user: User): Promise<{ userId: string }>;
}
