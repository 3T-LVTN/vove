import AsyncStorage from '@react-native-async-storage/async-storage';

export async function set(key: any, value: any) {
  await AsyncStorage.setItem(key, JSON.stringify(value))
}

export async function get(key: any) {
  return await AsyncStorage.getItem(key)
}

export async function merge(key: any, value: any) {
  await AsyncStorage.mergeItem(key, JSON.stringify(value))
}

export async function rm(key: any) {
  await AsyncStorage.removeItem(key)
}
