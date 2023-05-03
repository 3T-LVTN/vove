import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenSize } from '@front-end/shared/utils';
import Home from '../screens/home/home';

const Stack = createStackNavigator();

// const backButtonImg = () => {
//   return (
//     <Image
//       source={require("../images/backButton.png")}
//       style={{
//         height: ScreenSize.width * 0.1,
//         width: ScreenSize.width * 0.1,
//         marginLeft: ScreenSize.width * 0.06,
//       }}
//     />
//   );
// };

// const HeaderStyle = {
//   headerBackImage: backButtonImg,
//   headerStyle: {
//     backgroundColor: "white",
//     height: ScreenSize.height * 0.156,
//   },
//   headerTitleStyle: { fontSize: ScreenSize.width * 0.06 },
//   headerTintColor: "black",
//   headerBackTitleVisible: false,
//   headerTitleAlign: 'center',
//   title: "Đăng ký",
// };

export const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
