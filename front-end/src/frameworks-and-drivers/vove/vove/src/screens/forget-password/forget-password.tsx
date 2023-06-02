import React, { useState } from "react";
import { View, StyleSheet, Image, ScrollView, Alert } from "react-native";
import * as Cache from '@front-end/frameworks-and-drivers/app-sync/cache'
import {ButtonFullWidth, InputText, StepBar} from "@front-end/frameworks-and-drivers/vove/vove/src/components";
import {Color, ScreenSize} from "@front-end/shared/utils";

export interface ForgetPasswordProps {
  readonly navigation: any;
  readonly route: any;
}

export function ForgetPassword(props: ForgetPasswordProps) {
  const { navigation, route } = props
  const [phoneNumber, setPhoneNumber] = useState('')

  const handleSubmit = () => {
    const phone = '+84' + phoneNumber.substring(1);
    navigation.navigate("InsertOtp", { phoneNumber: phone })
  }

  return (
    <View style={styles.container}>
      <StepBar step={1}></StepBar>
      <ScrollView>
        <View style={{...styles.container, paddingTop: ScreenSize.height * 0.05}}>
          <Image
            source={require("../../images/forget-password.png")}
            style={{width: ScreenSize.width * 0.5, height: ScreenSize.width * 0.3}}
          ></Image>
          <InputText allowOutput={true} output={setPhoneNumber} title="Phone number" placeholder="Enter your phone number" rightIcon={phoneNumber==''? '' : 'check-circle-outline'} keyboardType="numeric"></InputText>
        </View>
      </ScrollView>
      <View style={{paddingBottom: ScreenSize.height * 0.1}}>
        <ButtonFullWidth content='Send OTP' onPress={() => handleSubmit()}></ButtonFullWidth>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white_100,
    alignItems: 'center',
  },
});

export default ForgetPassword
