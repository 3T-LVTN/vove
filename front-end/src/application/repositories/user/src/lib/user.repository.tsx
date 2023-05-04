import {User} from "@front-end/domain/entities/user";

export interface UserRepository {
  getUser(id: string): Promise<User>;
}
