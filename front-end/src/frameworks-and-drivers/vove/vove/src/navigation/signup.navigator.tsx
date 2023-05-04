import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenSize } from '@front-end/shared/utils';
import Signup from '../screens/signup/sigup';
import InsertOtp from '../screens/insert-otp/insert-otp';
import SetNewPassword from '../screens/set-new-password/set-new-password';
import SignupSucceed from '../screens/signup-succeed/signup-succeed';
import InsertOtpSignup from '../screens/insert-otp/insert-otp-signup/insert-otp-signup';

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

export const SignUpStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignUp">
      <Stack.Screen name="Signup" component={Signup}/>
      <Stack.Screen name="InsertOtpSignup" component={InsertOtpSignup} />
      <Stack.Screen name="SetNewPassword" component={SetNewPassword} />
      <Stack.Screen
        name="SignupSucceed"
        component={SignupSucceed}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
