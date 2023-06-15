import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import {
  ButtonFullWidth,
  InputOtp,
  StepBar,
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import { firebase } from '@front-end/frameworks-and-drivers/firebase-auth';
import { Color, ScreenSize } from '@front-end/shared/utils';

export function InsertOtp(props: any) {
  const { phoneNumber } = props.route.params;
  const [OTP, setOTP] = useState('');
  const [verifyId, setVerifyId] = useState('');
  const recaptchaVerifier = useRef(null)

  async function handleSendCode() {
    const provider = new firebase.auth.PhoneAuthProvider()
    provider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current!)
      .then(setVerifyId)
      .catch(() => {
        props.navigation.navigate('ActionFailed', {
          title: 'Gửi mã OTP thất bại',
          message: 'Thiết bị này đã gọi quá nhiều OTP trong thời gian ngắn\nVui lòng thử lại sau'
        })
      })
  }

  async function handleSubmit() {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verifyId,
      OTP
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setOTP('')
        props.navigation.navigate('ResetPassword', { phoneNumber: phoneNumber })
        // props.navigation.navigate('ActionSuccess', {
        //   title: 'Xác thực thành công',
        //   message: 'Vui lòng đặt lại mật khẩu mới'
        // })
      })
      .catch(() => {
        props.navigation.navigate('ActionFailed', {
          title: 'Xác thực thất bại',
          message: 'Bạn đã nhập sai mã OTP. Vui lòng thử lại'
        })
      });
  };

  useEffect(() => {
    handleSendCode()
  }, [])

  return (
    <View style={styles.container}>
      <StepBar step={2}></StepBar>
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebase.app().options}/>
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
              handleSendCode();
            }}
          ></InputOtp>
        </View>
      </ScrollView>
      <View style={{ paddingBottom: ScreenSize.height * 0.1 }}>
        <ButtonFullWidth
            content="Tiếp theo"
            onPress={() => handleSubmit()}
        ></ButtonFullWidth>
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

export default InsertOtp;
