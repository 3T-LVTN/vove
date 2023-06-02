import {User} from "@front-end/domain/entities/user";

export interface UserRepository {
  getUser(id: string): Promise<User>;
  login(phone: string, password: string): Promise<User & {accessToken: string}>;
  verifyPhoneNumber(phoneNumber: string): Promise<boolean>;
  register(user: User): Promise<{ userId: string }>
}
