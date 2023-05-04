import {User} from "@front-end/domain/entities/user";
import {UserRepository} from "@front-end/application/repositories/user";
import {UserUseCase} from "@front-end/application/usecases/user";

export class UserInteractor implements UserUseCase {
  constructor(private readonly UserRepository: UserRepository) {
  }
  async getUser(id: string): Promise<User> {
    return this.UserRepository.getUser(id)
      .then((user) => user)
      .catch((error) => {
        throw new Error(error)
      });
  }
}
