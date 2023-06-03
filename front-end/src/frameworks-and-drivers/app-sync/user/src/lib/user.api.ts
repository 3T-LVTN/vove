import { User } from '@front-end/domain/entities/user';
import { axios } from '@front-end/frameworks-and-drivers/app-sync/axios';
import { UserRepository } from '@front-end/application/repositories/user';

export class UserApi implements UserRepository {
  async getUser(id: string): Promise<User> {
    return axios.get<User>(`/users/${id}`).then((response) => response.data);
  }

  async login(
    phoneNumber: string,
    password: string
  ): Promise<User & { accessToken: string }> {
    return axios
      .post<User & { accessToken: string }>(`/users/login`, {
        phoneNumber,
        password,
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  async verifyPhoneNumber(phoneNumber: string): Promise<boolean> {
    return axios
      .get<{ isUsed: boolean }>(`/users/verify/${phoneNumber}`)
      .then((response) => response.data.isUsed)
      .catch((error) => {
        throw error;
      });
  }

  async register(user: User): Promise<{ userId: string }> {
    return axios
      .post<{ userId: string }>(`/users`, user)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}
