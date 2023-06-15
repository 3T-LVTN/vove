import React from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Color,
  customSize,
  ScreenSize,
  TextStyle,
} from '@front-end/shared/utils';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { PlaceStatusLabel } from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postSendFeedback } from '../../services';

export function PlaceDetail(props: any) {
  const { title, placeName, address, status } = props.route.params
  const receivedAddress = {
    lat: address.lat,
    lng: address.lng
  }

  function handleFormatTimeLeft(time: number) {
    const h = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const m = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    const s = Math.floor((time % (1000 * 60)) / 1000)
    return ((h < 10)? '0' :  '') + h
    + ((m < 10)? ':0' :  ':') + m
    + ((s < 10)? ':0' :  ':') + s
  }

  async function handleSendFeedback(point: number) {
    try {
      const token = await AsyncStorage.getItem('userToken')
      await postSendFeedback(point, receivedAddress, JSON.parse(token!))
      props.navigation.navigate('ActionSuccess', {
        title: 'Gửi phản hồi thành công',
        message: 'Hãy gửi thêm phản hồi khi có dự đoán mới'
      })
    } catch (err: any) {
      if (err.response.status == 403) {
        const currentTime = new Date().getTime()
        const validTime = new Date(err.response.data).getTime()
        props.navigation.navigate('ActionFailed', {
          title: 'Gửi phản hồi thất bại',
          message: 'Kết quả dự đoán chưa được cập nhật\nHãy quay lại sau '
        })
      }
      else Alert.alert('Thông tin đăng nhập đã hết hạn, xin vui lòng đăng nhập lại');
    }
  }

  return (
    <ScrollView
      style={{ height: ScreenSize.height, backgroundColor: 'white' }}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container}>
        <AnimatedCircularProgress
          rotation={-120}
          lineCap="round"
          size={ScreenSize.width * 0.6}
          width={35}
          fill={25 * (status + 1)}
          arcSweepAngle={240}
          tintColor={status == 0? Color.primary_100 : status == 1? Color.yellow_40 : status == 2? Color.orange_20 : Color.red_100}
          backgroundColor={Color.grey_60}
          padding={5}
        />
        <Text style={TextStyle.h2}>{title}</Text>
        <Text style={{...TextStyle.bodyLarge, textAlign: 'center'}}>{placeName}</Text>
        <PlaceStatusLabel status={status} />
        <View style={styles.containerWithBorder}>
          <Text
            style={{
              ...TextStyle.h3,
              color: Color.primary_100,
              alignSelf: 'flex-start',
            }}
          >
            Bạn cảm thấy thế nào về dự đoán này?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingTop: 10,
            }}
          >
            <Pressable style={styles.optionExact} onPress={() => handleSendFeedback(2)}>
              <Text style={{ ...TextStyle.h3, color: 'white' }}>Chính xác</Text>
            </Pressable>
            <Pressable style={styles.optionNormal} onPress={() => handleSendFeedback(1)}>
              <Text style={{ ...TextStyle.h3, color: 'white' }}>Tạm ổn</Text>
            </Pressable>
            <Pressable style={styles.optionFalse} onPress={() => handleSendFeedback(0)}>
              <Text style={{ ...TextStyle.h3, color: 'white' }}>Sai</Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{ width: '100%', paddingVertical: ScreenSize.height * 0.02 }}
        >
          <Text style={{ ...TextStyle.h3, color: Color.primary_100 }}>
            Những điều bạn nên làm
          </Text>
          <View style={styles.containerWithBorder}>
            <Image source={require('../../images/advices.png')} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: (24 / 375) * ScreenSize.width,
    paddingTop: customSize(30),
    height: '100%',
    alignItems: 'center',
  },
  containerWithBorder: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    borderRadius: 10,
    borderColor: Color.primary_100,
    borderWidth: 1,
    paddingHorizontal: customSize(15),
    paddingVertical: customSize(15),
    marginTop: 15,
  },
  optionExact: {
    backgroundColor: Color.primary_100,
    width: (90 / 375) * ScreenSize.width,
    alignItems: 'center',
    paddingVertical: (13 / 812) * ScreenSize.height,
    borderRadius: 45,
  },
  optionNormal: {
    backgroundColor: Color.yellow_40,
    width: (90 / 375) * ScreenSize.width,
    alignItems: 'center',
    paddingVertical: (13 / 812) * ScreenSize.height,
    borderRadius: 45,
  },
  optionFalse: {
    backgroundColor: Color.red_100,
    width: (90 / 375) * ScreenSize.width,
    alignItems: 'center',
    paddingVertical: (13 / 812) * ScreenSize.height,
    borderRadius: 45,
  },
});

export default PlaceDetail;
