import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

export async function fetchData() {
  try {
    AsyncStorage.removeItem('phone')
    AsyncStorage.removeItem('name')
    AsyncStorage.removeItem('avatar')
    AsyncStorage.removeItem('address')
    AsyncStorage.removeItem('addressName')
    AsyncStorage.removeItem('trackingPlaces')
    AsyncStorage.removeItem('inquiries')
    AsyncStorage.removeItem('feedbacks')

    const token = await AsyncStorage.getItem('userToken');
    const res = await getProfile(JSON.parse(token!));
    AsyncStorage.setItem('phone', res.data[0].phone);
    AsyncStorage.setItem('name', res.data[0].name);
    AsyncStorage.setItem('avatar', res.data[0].avatar);
    if (res.data[0].address)
      AsyncStorage.setItem('address', JSON.stringify(res.data[0].address));
    if (res.data[0].addressName)
      AsyncStorage.setItem('addressName', res.data[0].addressName);
    if (res.data[0].trackingPlaces)
      AsyncStorage.setItem('trackingPlaces', JSON.stringify(res.data[0].trackingPlaces));
    if (res.data[0].inquiries)
      AsyncStorage.setItem('inquiries', JSON.stringify(res.data[0].inquiries));
    if (res.data[0].feedbacks)
      AsyncStorage.setItem('feedbacks', JSON.stringify(res.data[0].feedbacks));
  } catch (err) {
    Alert.alert('Thông tin đăng nhập đã hết hạn, xin vui lòng đăng nhập lại');
  }
}

export const getProfile = (token: any) => {
  return axios.get('profile', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const postUpdateProfile = (
  name: string,
  avatar: string,
  token: any,
  address?: {
    lat: number,
    lng: number
  },
  addressName?: string
) => {
  return axios.post(
    'profile',
    {
      name: name,
      address: address,
      addressName: addressName,
      avatar: avatar,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const postCreateTrackingplace = (
  title: string,
  address: {
    lat: number,
    lng: number
  },
  addressName: string,
  token: any
) => {
  return axios.post(
    '/profile/create-trackingplace',
    {
      title: title,
      address: address,
      addressName: addressName
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const postUpdateTrackingplace = (
  title: string,
  id: string,
  token: any
) => {
  return axios.post(
    '/profile/update-trackingplace',
    {
      title: title,
      id: id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const postDeleteTrackingplace = (id: string, token: any) => {
  return axios.post(
    '/profile/delete-trackingplace',
    {
      id: id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
