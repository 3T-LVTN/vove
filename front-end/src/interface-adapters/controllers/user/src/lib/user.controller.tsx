import {UserUseCase} from "@front-end/application/usecases/user";
import {UserViewModel} from "@front-end/interface-adapters/view-models/user";

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  async getUser(id: string): Promise<UserViewModel> {
    return this.userUseCase.getUser(id)
      .then((user) => user as UserViewModel)
      .catch((error) => {
        throw new Error(error)
      });
  }
}
