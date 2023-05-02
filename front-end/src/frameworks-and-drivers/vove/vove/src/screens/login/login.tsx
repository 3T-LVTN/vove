import React, { useState } from "react";
import {Alert, Pressable, ScrollView, Text, View} from "react-native";
import {Color, ScreenSize, TextStyle} from "@front-end/shared/utils";
import AnimatedSplash from "react-native-animated-splash-screen";
import {Button, Input} from "@ui-kitten/components";
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
          <InputText title={"Phone number"} placeholder={"Please enter your phone number"}></InputText>
          <InputPassword></InputPassword>
        </View>
      </ScrollView>
    </AnimatedSplash>
  );
}
