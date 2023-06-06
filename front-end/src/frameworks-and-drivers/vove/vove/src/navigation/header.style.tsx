import { Image } from 'react-native';
import { ScreenSize } from '@front-end/shared/utils';

const backButtonImg = () => {
    return (
      <Image
        source={require('../images/back-button.png')}
        style={{
          height: ScreenSize.width * 0.1,
          width: ScreenSize.width * 0.1,
          marginLeft: ScreenSize.width * 0.06,
        }}
      />
    );
};

export const HeaderStyle = {
    headerBackImage: backButtonImg,
    headerStyle: {
      backgroundColor: 'white',
      height: ScreenSize.height * 0.12,
    },
    headerTitleStyle: { fontSize: ScreenSize.width * 0.05 },
    headerTintColor: 'black',
    headerBackTitleVisible: false,
    headerTitleAlign: 'center',
    headerShadowVisible: false,
};
