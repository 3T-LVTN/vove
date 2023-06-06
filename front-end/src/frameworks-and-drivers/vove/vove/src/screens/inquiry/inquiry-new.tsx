import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  ButtonType,
  Color,
  customSize,
  ScreenSize,
  TextStyle,
} from '@front-end/shared/utils';
import {
  ButtonHalfWidth, InputText
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchData, postCreateInquiry } from '../../services';

export function NewInquiry(props: any) {
  const list = props.route.params
  const [title, setTitle] = React.useState('')
  const [message, setMessage] = React.useState('')

  async function handleSend(title: string, message: string) {
    try {
      const token = await AsyncStorage.getItem('userToken')
      await postCreateInquiry(title, message, JSON.parse(token!))
      await fetchData()
      const inquiries = await AsyncStorage.getItem('inquiries')
      props.navigation.navigate('InquiryList', 
      { 
        update: true,
        updateList: JSON.parse(inquiries!)
      })
      props.navigation.navigate('ActionSuccess', {
        title: 'Tạo yêu cầu thành công',
        message: ''
      })
    } catch (err: any) {
      Alert.alert('Thông tin đăng nhập đã hết hạn, xin vui lòng đăng nhập lại');
    }
  }

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
            Tiêu đề
          </Text>
          <View style={{ paddingTop: ScreenSize.width * 0.02 }} />
          <View
            style={{ ...styles.contentInput, height: ScreenSize.height * 0.06 }}
          >
                      <InputText 
            title={''}
            placeholder='Nhập tiêu đề'
            text={title}
            output={setTitle}
            multiline={true}
            marginTop={-ScreenSize.height * 0.02}
          />
          </View>
          <View style={{ paddingTop: ScreenSize.width * 0.02 }} />
          <Text
            style={{
              ...TextStyle.h3,
              color: Color.dark_100,
              alignSelf: 'flex-start',
            }}
          >
            Nội dung
          </Text>
          <View style={{ paddingTop: ScreenSize.width * 0.02 }} />
          <View
            style={{ ...styles.contentInput, height: ScreenSize.height * 0.4 }}
          >
            <InputText 
            title={''}
            placeholder='Nhập nội dung'
            text={message}
            output={setMessage}
            multiline={true}
            marginTop={-ScreenSize.height * 0.02}
          />
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingBottom: ScreenSize.height * 0.04,
        }}
      >
        <ButtonHalfWidth
          type={ButtonType.DISABLE}
          content={'Hủy'}
          onPress={() => {
            props.navigation.goBack();
          }}
        />
        <ButtonHalfWidth
          type={ButtonType.DEFAULT}
          content='Gửi yêu cầu'
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
