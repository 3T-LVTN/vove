import React, { useState } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import {
  ButtonFullWidth,
  InputText,
  StepBar,
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import { Color, ScreenSize } from '@front-end/shared/utils';

export function ForgetPassword(props: any) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const validatePhoneNumber = () => {
    return phoneNumber.length === 10
  };

  async function handleSubmit() {
    if (!validatePhoneNumber()) props.navigation.navigate('ActionFailed', {
      title: 'Gửi OTP thất bại',
      message: 'Ứng dụng chỉ hỗ trợ số điện thoại VN, xin lỗi vì sự bất tiện này'
    })
    else {
      const phone = '+84' + phoneNumber.substring(1);
      props.navigation.navigate('InsertOtp', { phoneNumber: phone });
    }
  };

  return (
    <View style={styles.container}>
      <StepBar step={1}></StepBar>
      <ScrollView>
        <View
          style={{ ...styles.container, paddingTop: ScreenSize.height * 0.05 }}
        >
          <Image
            source={require('../../images/forget-password.png')}
            style={{
              width: ScreenSize.width * 0.5,
              height: ScreenSize.width * 0.3,
            }}
          ></Image>
          <InputText
            text={phoneNumber}
            output={setPhoneNumber}
            title="Số điện thoại"
            placeholder="Nhập số điện thoại đăng ký"
            rightIcon={validatePhoneNumber() ? 'check-circle-outline' : ''}
            keyboardType="numeric"
          ></InputText>
        </View>
      </ScrollView>
      <View style={{ paddingBottom: ScreenSize.height * 0.1 }}>
        <ButtonFullWidth
          content="Gửi mã OTP"
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

export default ForgetPassword;
