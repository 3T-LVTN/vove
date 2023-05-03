import React from 'react';
import { Button, StyleSheet, View, Text } from 'react-native';

export interface SignupSucceedProps {
  readonly navigation: any;
}

export function SignupSucceed(props: SignupSucceedProps) {
  return (
    <View style={styles.center}>
      <Text>Sign up succeed</Text>
      <Button
        title="Back to Login"
        onPress={() => props.navigation.goBack(props.navigation.popToTop())}
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

export default SignupSucceed;
