import { UserUseCase } from '@front-end/application/usecases/user';
import { UserViewModel } from '@front-end/interface-adapters/view-models/user';
import { User } from '@front-end/domain/entities/user';

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  async getUser(id: string): Promise<UserViewModel> {
    return this.userUseCase
      .getUser(id)
      .then((user) => user as UserViewModel)
      .catch((error) => {
        throw new Error(error);
      });
  }

  async login(phoneNumber: string, password: string): Promise<User> {
    return this.userUseCase
      .login(phoneNumber, password)
      .then((user) => user)
      .catch((error) => {
        throw new Error(error);
      });
  }

  async verifyPhoneNumber(phoneNumber: string): Promise<boolean> {
    return this.userUseCase
      .verifyPhoneNumber(phoneNumber)
      .then((res) => res)
      .catch((error) => {
        throw new Error(error);
      });
  }

  async register(user: User): Promise<{ userId: string }> {
    return this.userUseCase
      .register(user)
      .then((res) => res)
      .catch((error) => {
        throw new Error(error);
      });
  }
}
