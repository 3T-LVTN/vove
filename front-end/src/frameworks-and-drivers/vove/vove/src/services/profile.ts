import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

export async function fetchData() {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const res = await getProfile(JSON.parse(token!));
    AsyncStorage.setItem('phone', res.data[0].phone);
    AsyncStorage.setItem('name', res.data[0].name);
    if (res.data[0].address) {
      AsyncStorage.setItem('addressLat', JSON.stringify(res.data[0].address.lat));
      AsyncStorage.setItem('addressLng', JSON.stringify(res.data[0].address.lng));
    }
    else {
      AsyncStorage.removeItem('addressLat');
      AsyncStorage.removeItem('addressLng');
    }
    AsyncStorage.setItem('trackingPlaces', JSON.stringify(res.data[0].trackingPlaces));
    AsyncStorage.setItem('inquiries', JSON.stringify(res.data[0].inquiries));
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
  lat?: number,
  lng?: number,
) => {
  return axios.post(
    'profile',
    {
      name: name,
      lat: lat,
      lng: lng,
      avatar: avatar,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const postCreateTrackingplace = (
  title: string,
  lat: number,
  lng: number,
  token: any
) => {
  return axios.post(
    '/profile/create-trackingplace',
    {
      title: title,
      lat: lat,
      lng: lng
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

export const postCreateInquiry = (
  title: string,
  message: string,
  token: any
) => {
  return axios.post(
    '/profile/create-inquiry',
    {
      title: title,
      message: message,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const postCloseInquiry = (id: string, token: any) => {
  return axios.post(
    '/profile/close-inquiry',
    {
      id: id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const postCommentInquiry = (id: string, message: string, token: any) => {
  return axios.post(
    '/profile/comment-inquiry',
    {
      id: id,
      message: message,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
