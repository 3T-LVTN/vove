import { User } from '@front-end/domain/entities/user';
import { UserRepository } from '@front-end/application/repositories/user';
import { UserUseCase } from '@front-end/application/usecases/user';
import * as Cache from '@front-end/frameworks-and-drivers/app-sync/cache';

export class UserInteractor implements UserUseCase {
  constructor(private readonly UserRepository: UserRepository) {}
  async getUser(id: string): Promise<User> {
    return this.UserRepository.getUser(id)
      .then((user) => user)
      .catch((error) => {
        throw new Error(error);
      });
  }

  async login(phoneNumber: string, password: string): Promise<User> {
    return this.UserRepository.login(phoneNumber, password)
      .then((user) => {
        Cache.set('accessToken', user.accessToken);
        Cache.set('user', user);
        return user;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  async verifyPhoneNumber(phoneNumber: string): Promise<boolean> {
    return this.UserRepository.verifyPhoneNumber(phoneNumber)
      .then((res) => res)
      .catch((error) => {
        throw new Error(error);
      });
  }

  async register(user: User): Promise<{ userId: string }> {
    return this.UserRepository.register(user)
      .then((res) => res)
      .catch((error) => {
        throw new Error(error);
      });
  }
}
