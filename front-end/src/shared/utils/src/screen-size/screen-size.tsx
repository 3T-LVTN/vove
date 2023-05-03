import { Dimensions } from 'react-native';

export class ScreenSize {
  static width = Dimensions.get('window').width;
  static height = Dimensions.get('window').height;
}
