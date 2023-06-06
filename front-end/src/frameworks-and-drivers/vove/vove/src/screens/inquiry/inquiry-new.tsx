import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  ButtonType,
  Color,
  customSize,
  InquiryStatusType,
  ScreenSize,
  TextStyle,
} from '@front-end/shared/utils';
import {
  ButtonHalfWidth,
  InputText,
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postCreateInquiry } from '../../services/profile';

export interface NewInquiryProps {
  navigation: any;
}

async function handleSend(title: string, message: string) {
  try {
    await postCreateInquiry(title, message, await AsyncStorage.getItem);
  } catch (err: any) {
    Alert.alert('Empty input');
  }
}

export function NewInquiry(props: NewInquiryProps) {
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');

  return (
    <View style={styles.container}>
      <ScrollView
        style={{ paddingTop: 12, backgroundColor: Color.white_100 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.center}>
          <Text
            style={{
              ...TextStyle.h3,
              color: Color.dark_100,
              alignSelf: 'flex-start',
            }}
          >
            Title
          </Text>
          <View style={{ paddingTop: ScreenSize.width * 0.02 }} />
          <View
            style={{ ...styles.contentInput, height: ScreenSize.height * 0.06 }}
          ></View>
          <View style={{ paddingTop: ScreenSize.width * 0.02 }} />
          <Text
            style={{
              ...TextStyle.h3,
              color: Color.dark_100,
              alignSelf: 'flex-start',
            }}
          >
            Message
          </Text>
          <View style={{ paddingTop: ScreenSize.width * 0.02 }} />
          <View
            style={{ ...styles.contentInput, height: ScreenSize.height * 0.5 }}
          ></View>
          {/*<InputText*/}
          {/*  title={'Title'}*/}
          {/*  placeholder={'Enter inquiry title'}*/}
          {/*  allowOutput={true}*/}
          {/*  output={setTitle}*/}
          {/*  rightIcon={title === '' ? '' : 'check-circle-outline'}*/}
          {/*  multiline={true}*/}
          {/*></InputText>*/}

          {/*<InputText*/}
          {/*  title={'Message'}*/}
          {/*  placeholder={'Enter inquiry message'}*/}
          {/*  allowOutput={true}*/}
          {/*  output={setMessage}*/}
          {/*  rightIcon={message === '' ? '' : 'check-circle-outline'}*/}
          {/*  multiline={true}*/}
          {/*></InputText>*/}
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingTop: 10,
        }}
      >
        <ButtonHalfWidth
          type={ButtonType.DISABLE}
          content={'Cancel'}
          onPress={() => {
            console.log('');
          }}
        />
        <ButtonHalfWidth
          type={ButtonType.DEFAULT}
          content={'Send Inquiry'}
          onPress={() => handleSend(title, message)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: (24 / 375) * ScreenSize.width,
    paddingTop: customSize(12),
    backgroundColor: Color.white_100,
    height: '100%',
    width: '100%',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
  },
  contentInput: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    borderRadius: 10,
    borderColor: Color.dark_40,
    borderWidth: 1,
    paddingHorizontal: customSize(5),
    paddingVertical: customSize(5),
  },
});

export default NewInquiry;
