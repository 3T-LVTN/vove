import React, { useState } from "react";
import {ScrollView, View, Text, Button} from "react-native";
import {Color, ScreenSize} from "@front-end/shared/utils";
import AnimatedSplash from "react-native-animated-splash-screen";
import {InputText} from "../../components/inputs/input-text";
import {InputPassword} from "../../components/inputs/input-password";

export interface LoginProps {
  navigation: any
}

export function Login(props: LoginProps) {
  const [loading, setLoading] = useState(false);
  setTimeout(() => {
    setLoading(true);
  }, 2000);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <AnimatedSplash
      isLoaded={loading}
      logoImage={require('../../assets/Vove.png')}
      backgroundColor={"#ffffff"}
      logoWidth={ScreenSize.height * 0.8}
    >
      <ScrollView style={{backgroundColor: Color.white_100}}>
        <View style={{alignItems: "center", paddingVertical: ScreenSize.height * 0.15}}>
          <Text>Login</Text>
          <InputText title={"Phone number"} placeholder={"Please enter your phone number"}></InputText>
          <InputPassword title="Password" allowOutput={false}></InputPassword>
          <Button
            title="Login Failed"
            onPress={() => props.navigation.navigate("LoginFailed")}
          />
          <Button
            title="Home"
            onPress={() => props.navigation.navigate("UserStack")}
          />
          <Button
            title="Sign Up"
            onPress={() => props.navigation.navigate("SignupStack")}
          />
          <Button
            title="Forget pass"
            onPress={() => props.navigation.navigate("ForgetPasswordStack")}
          />
        </View>
      </ScrollView>
    </AnimatedSplash>
  );
}

export default Login;
