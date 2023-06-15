import axios from 'axios';

export const postLogin = (phone: string, password: string) => {
  return axios.post('https://api.vove-managed.com/auth/login', {
    phone: phone,
    password: password,
  });
};

export const postForgotPassword = (phone: string, password: string) => {
  return axios.post('https://api.vove-managed.com/auth/forgot-password', {
    phone: phone,
    password: password,
  });
};

export const postSignUp = (phone: string, name: string, password: string) => {
  return axios.post('https://api.vove-managed.com/auth/sign-up', {
    phone: phone,
    name: name,
    password: password,
  });
};

export const getToken = (token: any) => {
  return axios.get('https://api.vove-managed.com/auth/refresh', {
    headers: { Authorization: `Bearer ${token}` },
  })
};
