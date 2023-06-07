import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  ButtonFullWidth,
  InputPassword,
  StepBar,
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import { Color, ScreenSize, TextStyle } from '@front-end/shared/utils';
import * as Cache from '@front-end/frameworks-and-drivers/app-sync/cache';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';
import { SignupStackPropsData } from '../../navigation/signup.navigator';
import { UserApi } from '@front-end/frameworks-and-drivers/app-sync/user';
import { UserInteractor } from '@front-end/application/interactors/user';
import { UserController } from '@front-end/interface-adapters/controllers/user';
import { User } from '@front-end/domain/entities/user';
import { postSignUp } from '../../services/auth';

//export type SetNewPasswordProps = NativeStackScreenProps<SignupStackPropsData, "SetNewPassword">
export interface SetNewPasswordProps {
  readonly navigation: any;
  readonly route: any;
}

export function SetNewPassword(props: SetNewPasswordProps) {
  const { navigation, route } = props;
  const userRepository = new UserApi();
  const userUseCase = new UserInteractor(userRepository);
  const userController = new UserController(userUseCase);

  const { phoneNumber, name } = route.params;
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');

  async function handleSubmit() {
    if (pass1 === pass2 && pass1 !== '') {
      try {
        await postSignUp(phoneNumber, name, pass1);
        navigation.navigate('SignupSucceed');
      } catch (err: any) {
        err.response.status == 400
          ? Alert.alert('Only VN numbers are supported!')
          : Alert.alert('User exits');
      }
    } else Alert.alert('Passwords are different. Try again!');
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
          <Text style={TextStyle.h2}>Set your password</Text>
          <View style={{ padding: ScreenSize.height * 0.01 }}></View>
          <InputPassword
            allowOutput={true}
            output={setPass1}
            title="Enter your password"
          ></InputPassword>
          <InputPassword
            allowOutput={true}
            output={setPass2}
            title="Repeat your password"
          ></InputPassword>
        </View>
      </ScrollView>
      <View style={{ paddingBottom: ScreenSize.height * 0.1 }}>
        <ButtonFullWidth
          content="Confirm"
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

export default SetNewPassword;