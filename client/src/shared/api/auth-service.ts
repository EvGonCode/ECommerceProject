import { axiosAuth, axiosClassic } from './helpers/api-instance';
import {
  removeCookiesFromStorage,
  saveTokenStorage,
} from './helpers/token-helpers';

class AuthService {
  async login(login: string, password: string) {
    const response = await axiosAuth.post('/authenticate', {
      login,
      password,
    });
    if (response.status === 200) saveTokenStorage(response.data.token);
    return response;
  }

  async register(login: string, password: string) {
    const response = await axiosClassic.post('/registerUser', {
      login,
      password,
    });
    if (response.status === 200) saveTokenStorage(response.data.token);
    return response;
  }

  async checkAuth() {
    const response = await axiosClassic.get('/verify_jwt');
    return response;
  }

  async logout() {
    const response = await axiosClassic.post<boolean>('/unauthenticate');
    if (response.status === 200) removeCookiesFromStorage();
    return response;
  }
}

export const authService = new AuthService();
