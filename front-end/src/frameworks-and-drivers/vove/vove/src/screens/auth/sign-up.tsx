import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Color, ScreenSize, TextStyle } from '@front-end/shared/utils';
import {
  ButtonFullWidth,
  InputText,
  StepBar,
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';

export function Signup(props: any) {
  const [name, setName] = useState('');
  const [phoneNumber, setTel] = useState('');

  const validatePhoneNumber = () => {
    return phoneNumber.length === 10
  }

  async function handleSubmit() {
    if (name === '' || phoneNumber === '') props.navigation.navigate('ActionFailed', {
      title: 'Tạo tài khoản thất bại',
      message: 'Bạn chưa nhập đủ thông tin'
    })
    else if (!validatePhoneNumber()) props.navigation.navigate('ActionFailed', {
      title: 'Gửi OTP thất bại',
      message: 'Ứng dụng chỉ hỗ trợ số điện thoại VN, xin lỗi vì sự bất tiện này'
    })
    else {
      const phone = '+84' + phoneNumber.substring(1);
      props.navigation.navigate('InsertOtpSignup', { phoneNumber: phone, name: name });
    }
  };

  return (
    <View style={styles.container}>
      <StepBar step={1}></StepBar>
      <ScrollView style={{ backgroundColor: Color.white_100 }}>
        <View style={styles.container}>
          <View
            style={{
              ...styles.container,
              paddingTop: ScreenSize.height * 0.03,
              alignItems: 'flex-start',
            }}
          >
            <Text style={TextStyle.h2}>Nhập thông tin cá nhân</Text>
            <View style={{ padding: ScreenSize.height * 0.01 }}></View>
            <InputText
              text={name}
              output={setName}
              title="Tên"
              placeholder="Nhập tên người dùng"
              rightIcon={name === '' ? '' : 'check-circle-outline'}
            ></InputText>
            <InputText
              text={phoneNumber}
              output={setTel}
              title="Số điện thoại"
              placeholder="Nhập số điện thoại đăng ký"
              rightIcon={validatePhoneNumber() ? 'check-circle-outline' : ''}
              keyboardType="numeric"
            ></InputText>
          </View>
        </View>
        <View style={{ marginTop: ScreenSize.height * 0.2 }}></View>
      </ScrollView>
      <View
        style={{
          paddingBottom: ScreenSize.height * 0.1,
          alignItems: 'center',
          paddingTop: ScreenSize.height * 0.05,
        }}
      >
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

export default Signup;
