import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from 'firebase/compat';
import {
  ButtonFullWidth,
  InputOtp,
  StepBar,
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import { Color, ScreenSize } from '@front-end/shared/utils';

export interface InsertOtpSignupProps {
  readonly navigation: any;
  readonly route: any;
}

export function InsertOtpSignup(props: InsertOtpSignupProps) {
  const { navigation, route } = props;
  const [showButton, setShowButton] = useState(true);

  const { phoneNumber, name } = route.params;
  const [OTP, setOTP] = useState('');
  const [verifyId, setVerifyId] = useState('');
  const recaptchaVerifier: any = useRef();

  // const sendVerifyCode = () => {
  //   const provider = new firebase.auth.PhoneAuthProvider()
  //   provider
  //     .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
  //     .then(setVerifyId)
  // }

  // const confirmCode = () => {
  //   const credential = firebase.auth.PhoneAuthProvider.credential(verifyId, OTP)
  //   firebase.auth().signInWithCredential(credential)
  //     .then(() => {
  //       setOTP('')
  //       setShowButton(true)
  //       Alert.alert('Valid OTP')
  //     })
  //     .catch(() => {
  //       Alert.alert('Please try again')
  //       navigation.goBack()
  //     })
  // }

  // useEffect(() => {
  //   console.log(name + phoneNumber)
  // }, [])

  // useMemo(() => {
  //   if (OTP.length === 6) {
  //     confirmCode()
  //   }
  // }, [OTP])

  return (
    <View style={styles.container}>
      {/*<FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig}/>*/}
      <StepBar step={2}></StepBar>
      <ScrollView>
        <View
          style={{ ...styles.container, paddingTop: ScreenSize.height * 0.05 }}
        >
          <Image
            source={require('../../images/otp.png')}
            style={{
              width: ScreenSize.width * 0.34,
              height: ScreenSize.width * 0.29,
            }}
          ></Image>
          <View style={{ padding: ScreenSize.height * 0.04 }}></View>

          <InputOtp
            OTPInput={setOTP}
            onPress={() => {
              Alert.alert('OK');
            }}
          ></InputOtp>
        </View>
      </ScrollView>
      <View style={{ paddingBottom: ScreenSize.height * 0.1 }}>
        {showButton ? (
          <ButtonFullWidth
            content="Next"
            onPress={() =>
              navigation.navigate('SetNewPassword', {
                phoneNumber: phoneNumber,
                name: name,
              })
            }
          ></ButtonFullWidth>
        ) : null}
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

export default InsertOtpSignup;
