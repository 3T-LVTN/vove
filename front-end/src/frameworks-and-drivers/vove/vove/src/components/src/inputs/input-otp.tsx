import * as React from 'react';
import { SafeAreaView, Text, View, Pressable } from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import { Color, TextStyle, ScreenSize } from '@front-end/shared/utils';

export interface InputOtpProps {
  readonly onPress: () => void;
  readonly OTPInput: (OTP: string) => void;
}

export const InputOtp = ({ onPress, OTPInput }: InputOtpProps) => {
  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'column', marginBottom: 26 }}>
        <View style={{ marginBottom: 4 }}>
          <Text style={TextStyle.h2}>Xác thực số điện thoại</Text>
        </View>
        <Text style={[TextStyle.h4, { color: Color.grey_100 }]}>
          Vui lòng nhập mã OTP được gửi tới điện thoại
        </Text>
      </View>

      <OTPTextView
        inputCount={6}
        handleTextChange={(OTP: string) => OTPInput(OTP)}
        tintColor={Color.primary_40}
        offTintColor={Color.lightgrey_60}
        textInputStyle={{
          height: ScreenSize.height * 0.072,
          width: ScreenSize.width * 0.125,
          backgroundColor: Color.lightgrey_60,
          borderWidth: 1,
          borderRadius: 10,
          fontSize: 30,
          textAlign: 'center',
        }}
      />
      <View
        style={{ marginTop: ScreenSize.height * 0.02, flexDirection: 'row' }}
      >
        <Text style={{ ...TextStyle.h4, color: Color.grey_100 }}>
          {' '}
          Chưa nhận được mã?{' '}
        </Text>
        <Pressable onPress={onPress}>
          <Text style={{ ...TextStyle.h4, color: Color.primary_100 }}>
            Gửi lại
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
