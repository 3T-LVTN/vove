import React, {useState, useEffect} from "react";
import {Alert, ScrollView, StyleSheet, Text, View} from "react-native";
import {ButtonFullWidth, InputPassword, StepBar} from "@front-end/frameworks-and-drivers/vove/vove/src/components";
import {Color, ScreenSize, TextStyle} from "@front-end/shared/utils";
import * as Cache from '@front-end/frameworks-and-drivers/app-sync/cache';
import { postForgotPassword } from "../../services/auth";


export interface ResetPasswordProps {
  readonly navigation: any;
  readonly route: any;
}

export function ResetPassword(props: ResetPasswordProps) {
  const {navigation, route} = props
  const { phoneNumber } = route.params
  const [pass1, setPass1] = useState('')
  const [pass2, setPass2] = useState('')

  async function handleSubmit() {
    if (pass1 == pass2 && pass1 != '') {
      await postForgotPassword(phoneNumber, pass1);
      navigation.navigate("ResetPasswordSucceed")
    } else Alert.alert('Passwords are different. Try again!')
  }

  //   useEffect(() => {
  //     console.log(phoneNumber)
  // }, [])
  return (
    <View style={styles.container}>
      <StepBar step={3}></StepBar>
      <ScrollView>
        <View style={{...styles.container, paddingTop: ScreenSize.height * 0.03, alignItems: 'flex-start'}}>
          <Text style={TextStyle.h2}>Set your password</Text>
          <View style={{padding: ScreenSize.height * 0.01}}></View>
          <InputPassword allowOutput={true} output={setPass1} title='Enter your new password'></InputPassword>
          <InputPassword allowOutput={true} output={setPass2} title='Repeat your new password'></InputPassword>
        </View>
      </ScrollView>
      <View style={{paddingBottom: ScreenSize.height * 0.1}}>
        <ButtonFullWidth content='Confirm' onPress={() => handleSubmit()}></ButtonFullWidth>
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

export default ResetPassword;
