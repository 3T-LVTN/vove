import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  ButtonFullWidth,
  InputPassword,
  StepBar,
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import { Color, ScreenSize, TextStyle } from '@front-end/shared/utils';
import { postForgotPassword } from '../../services/auth';

export function ResetPassword(props: any) {
  const { phoneNumber } = props.route.params;
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');

  async function handleSubmit() {
    if (pass1 == pass2 && pass1 != '') {
      try {
        await postForgotPassword(phoneNumber, pass1);
        props.navigation.popToTop()
        props.navigation.goBack()
        props.navigation.navigate('ActionSuccess', {
        title: 'Đặt lại mật khẩu thành công',
        message: 'Bạn đã có thể sử dụng mật khẩu mới để đăng nhập'
      })} catch (err) {
        props.navigation.navigate('ActionFailed', {
          title: 'Đặt lại mật khẩu thất bại',
          message: 'Hệ thống đã xảy ra sự cố\nVui lòng thử lại sau'
        })
      }
    } else props.navigation.navigate('ActionFailed', {
      title: 'Đặt lại mật khẩu thất bại',
      message: 'Mật khẩu bạn bỏ trống hoặc không giống nhau'
    })
  }

  return (
    <View style={styles.container}>
      <StepBar step={3}></StepBar>
      <ScrollView>
        <View
          style={{
            ...styles.container,
            paddingTop: ScreenSize.height * 0.03,
            alignItems: 'flex-start',
          }}
        >
          <Text style={TextStyle.h2}>Đặt lại mật mới</Text>
          <View style={{ padding: ScreenSize.height * 0.01 }}></View>
          <InputPassword
            text={pass1}
            output={setPass1}
            title="Nhập mật khẩu mới"
          ></InputPassword>
          <InputPassword
            text={pass2}
            output={setPass2}
            title="Nhập lại mật khẩu mới"
          ></InputPassword>
        </View>
      </ScrollView>
      <View style={{ paddingBottom: ScreenSize.height * 0.1 }}>
        <ButtonFullWidth
          content="Xác nhận"
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

export default ResetPassword;
