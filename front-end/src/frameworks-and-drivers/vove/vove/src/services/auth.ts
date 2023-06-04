import axios from 'axios';

export const postLogin = (phone: string, password: string) => {
  return axios.post('auth/login', {
    phone: phone,
    password: password,
  });
};

export const postForgotPassword = (phone: string, password: string) => {
  return axios.post('auth/forgot-password', {
    phone: phone,
    password: password,
  });
};

export const postSignUp = (phone: string, name: string, password: string) => {
  return axios.post('auth/sign-up', {
    phone: phone,
    name: name,
    password: password,
  });
};

export const getToken = (token: any) => {
  return axios.get('auth/refresh', {
    headers: { Authorization: `Bearer ${token}` },
  });
};
