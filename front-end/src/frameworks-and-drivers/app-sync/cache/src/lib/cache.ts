import AsyncStorage from '@react-native-async-storage/async-storage';

export function set(key: any, value: any) {
  AsyncStorage.setItem(key, JSON.stringify(value))
}

export function get(key: any) {
  return AsyncStorage.getItem(key)
}

export function merge(key: any, value: any) {
  AsyncStorage.mergeItem(key, JSON.stringify(value))
}

export function rm(key: any) {
  AsyncStorage.removeItem(key)
}
