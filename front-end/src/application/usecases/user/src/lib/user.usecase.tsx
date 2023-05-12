import {User} from "@front-end/domain/entities/user";

export interface UserUseCase {
  getUser(id: string): Promise<User>;

}
