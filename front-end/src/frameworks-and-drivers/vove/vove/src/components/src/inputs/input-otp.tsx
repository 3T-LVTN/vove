import * as React from "react";
import { SafeAreaView, Text, View, Pressable } from "react-native";
import OTPTextView from "react-native-otp-textinput";
import { Color, TextStyle, ScreenSize } from "@front-end/shared/utils";

export interface InputOtpProps {
  readonly onPress : any;
  readonly OTPInput: any;
}

export const InputOtp = (props: InputOtpProps) => {
  const { onPress } = props

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "column", marginBottom: 26 }}>
        <View style={{ marginBottom: 4 }}>
          <Text style={TextStyle.h2}>Xác thực số điện thoại</Text>
        </View>
        <Text style={[TextStyle.h4, { color: Color.grey_100 }]}>
          Nhập mã OTP được gửi đến số điện thoại của bạn
        </Text>
      </View>

      <OTPTextView
        inputCount={6}
        handleTextChange={(OTP: any) => props.OTPInput(OTP)}
        tintColor={Color.primary_40}
        offTintColor={Color.lightgrey_60}
        textInputStyle={{
          height: ScreenSize.height * 0.072,
          width: ScreenSize.width * 0.125,
          backgroundColor: Color.lightgrey_60,
          borderWidth: 1,
          borderRadius: 10,
          fontSize:  30,
          textAlign: 'center',
        }}
      />
      <View style={{ marginTop: ScreenSize.height * 0.02, flexDirection: 'row' }}>
        <Text style={{...TextStyle.h4, color: Color.grey_100 }}> Bạn chưa nhận được mã OTP? </Text>
        <Pressable onPress={onPress}>
          <Text style={{...TextStyle.h4, color: Color.primary_100}}>Gửi lại mã</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
