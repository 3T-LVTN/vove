import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Color, ScreenSize, TextStyle } from '@front-end/shared/utils';
import {
  ButtonFullWidth,
  InputText,
  StepBar,
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import * as Cache from '@front-end/frameworks-and-drivers/app-sync/cache';
import { User } from '@front-end/domain/entities/user';
import { UserController } from '@front-end/interface-adapters/controllers/user';
import { UserInteractor } from '@front-end/application/interactors/user';
import { UserRepository } from '@front-end/application/repositories/user';
import { UserApi } from '@front-end/frameworks-and-drivers/app-sync/user';
import { SignupStackPropsData } from '../../navigation/signup.navigator';
import { NativeStackScreenProps } from 'react-native-screens/native-stack';

export interface SignupProps {
  readonly navigation: any;
  readonly route: any;
}

export function Signup(props: SignupProps) {
  const { navigation, route } = props;
  const [name, setName] = useState('');
  const [phoneNumber, setTel] = useState('');
  const [email, setMail] = useState('');

  const userRepository: UserRepository = new UserApi();
  const userUseCase = new UserInteractor(userRepository);
  const userController = new UserController(userUseCase);

  const handleSubmit = () => {
    if (name === '' || phoneNumber === '') {
      Alert.alert('Please fill all information');
      return;
    }
    const phone = '+84' + phoneNumber.substring(1);
    navigation.navigate('InsertOtpSignup', { phoneNumber: phone, name: name });
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
            <Text style={TextStyle.h2}>Fill in your information</Text>
            <View style={{ padding: ScreenSize.height * 0.01 }}></View>
            <InputText
              allowOutput={true}
              output={setName}
              title="Name"
              placeholder="Please enter your name"
              rightIcon={name === '' ? '' : 'check-circle-outline'}
            ></InputText>
            <InputText
              allowOutput={true}
              output={setTel}
              title="Phone number"
              placeholder="Please enter your phone number"
              rightIcon={phoneNumber === '' ? '' : 'check-circle-outline'}
              keyboardType="numeric"
            ></InputText>
            {/*<InputText*/}
            {/*  allowOutput={true}*/}
            {/*  output={setMail}*/}
            {/*  title="Address"*/}
            {/*  placeholder="Please enter your adress"*/}
            {/*  rightIcon={email === '' ? '' : 'check-circle-outline'}*/}
            {/*></InputText>*/}
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
          content="Next"
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
