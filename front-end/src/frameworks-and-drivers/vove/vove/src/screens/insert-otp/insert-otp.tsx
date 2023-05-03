import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { InputText } from '../../components/src/inputs/input-text';

export interface InsertOtpProps {
  readonly navigation: any;
}

export function InsertOtp(props: InsertOtpProps) {
  return (
    <View style={styles.center}>
      <Text>insert otp</Text>
      <InputText title={'OTP'} placeholder={'insert otp'}></InputText>
      <Button
        title="Reset password"
        onPress={() => props.navigation.navigate('ResetPassword')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default InsertOtp;
