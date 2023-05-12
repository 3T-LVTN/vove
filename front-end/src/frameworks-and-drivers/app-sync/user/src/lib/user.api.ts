import {User} from "@front-end/domain/entities/user";
import {axios} from "@front-end/frameworks-and-drivers/app-sync/axios";
import {UserRepository} from "@front-end/application/repositories/user";

export class UserApi implements UserRepository {
  async getUser(id: string): Promise<User> {
    return axios.get<User>(`/users/${id}`)
      .then((response) => response.data);
  }
}
