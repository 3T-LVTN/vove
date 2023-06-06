import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

export async function refreshNof() {
    try {
      AsyncStorage.removeItem('nof')
      const token = await AsyncStorage.getItem('userToken');
      const res = await getNof(JSON.parse(token!));
      if (res.data)
        AsyncStorage.setItem('nof', JSON.stringify(res.data));
    } catch (err) {
      Alert.alert('Thông tin đăng nhập đã hết hạn, xin vui lòng đăng nhập lại');
    }
  }

export const getNof = (token: any) => {
    return axios.get('nof', {
      headers: { Authorization: `Bearer ${token}` },
    });
};