import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenSize } from '@front-end/shared/utils';
import { UserNavBar } from './user-nav-bar.navigator';

const Stack = createStackNavigator();

// const backButtonImg = () => {
//   return (
//     <Image
//       source={require("../images/back-button.png")}
//       style={{
//         height: ScreenSize.width * 0.1,
//         width: ScreenSize.width * 0.1,
//         marginLeft: ScreenSize.width * 0.06,
//       }}
//     />
//   );
// };
//
// let center = "center" as "center" | "left" | undefined;
//
// const HeaderStyle = {
//   headerBackImage: backButtonImg,
//   headerStyle: {
//     backgroundColor: "white",
//     height: ScreenSize.height * 0.1,
//   },
//   headerTitleStyle: {fontSize: ScreenSize.width * 0.05},
//   headerTintColor: "black",
//   headerBackTitleVisible: false,
//   headerTitleAlign: center,
//   title: "Home",
// };

export const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        component={UserNavBar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
