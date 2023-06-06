import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  ButtonType,
  Color,
  customSize,
  ScreenSize,
  TextStyle,
} from '@front-end/shared/utils';
import {
  ButtonHalfWidth,
  InputInformation,
  InputText,
} from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import { formatDate } from '../../components/src/cards/time-format';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postCloseInquiry, postCommentInquiry } from '../../services';

export function InquiryDetail(props: any) {
  const { index, list } = props.route.params
  const vnTime = formatDate(list[index].time)
  const [newCmtText, setNewCmtText] = useState('')

  async function handleClose() {
    if (list[index].status == 2) return
    try {
      const token = await AsyncStorage.getItem('userToken')
      await postCloseInquiry(list[index].id, JSON.parse(token!))
      list[index].status = 2
      props.navigation.navigate('InquiryList', 
      { 
        update: true,
        updateList: list
      })
      props.navigation.navigate('ActionSuccess', {
        title: 'Đóng yêu cầu thành công',
        message: ''
      })
    } catch (err) {
      Alert.alert('Thông tin đăng nhập đã hết hạn, xin vui lòng đăng nhập lại');
    }
  }

  async function handleComment() {
    if (list[index].status == 2 || newCmtText == '') return
    try {
      const token = await AsyncStorage.getItem('userToken')
      await postCommentInquiry(list[index].id, newCmtText, JSON.parse(token!))
      const newCmt = {
        isAdmin: false,
        message: newCmtText,
        time: new Date().toISOString()
      } 
      list[index].comments.push(newCmt)
      props.navigation.navigate('InquiryList', 
      { 
        update: true,
        updateList: list
      })
      props.navigation.navigate('ActionSuccess', {
        title: 'Gửi bình luận thành công',
        message: ''
      })
    } catch (err) {
      Alert.alert('Thông tin đăng nhập đã hết hạn, xin vui lòng đăng nhập lại');
    }
  }

  return (
    <View style={styles.container}>

      <View>
        <Text style={{ ...TextStyle.h2 }}>{list[index].title}</Text>
      </View>
      <View style={{ paddingTop: ScreenSize.height * 0.02 }} />
      <ScrollView style={{ paddingTop: 12, backgroundColor: Color.white_100 }}>
        <View style={styles.center}>
          <View style={{ width: '100%' }}>
            <InputInformation
              title="Thời gian"
              information={vnTime}
            ></InputInformation>
            <InputInformation
              title="Trạng thái"
              information={list[index].status == 0 ? 'ĐANG CHỜ' : list[index].status == 1 ? 'ĐANG MỞ' : 'ĐÃ ĐÓNG'}
            ></InputInformation>
            <InputInformation
              title="Nội dung"
              information={list[index].message}
            ></InputInformation>
          </View>
          
          <View style={{ paddingTop: ScreenSize.height * 0.008 }} />
        </View>
        
        <View style={{ paddingTop: ScreenSize.height * 0.02 }} />
        <View style={{ paddingBottom: ScreenSize.height * 0.02 }}>
            <Text style={{ ...TextStyle.h3, color: Color.dark_100 }}>
              Bình luận ({list[index].comments.length})
            </Text>
        </View>
        { list[index].comments.map((item: any, index: number) => (
              <View key={index}>
                <View
                  style={{
                    ...styles.center,
                    borderColor: item.isAdmin
                      ? Color.primary_100
                      : Color.yellow_20,
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <Text
                      style={{
                        ...TextStyle.bodyLarge,
                        alignSelf: 'flex-start',
                        paddingHorizontal: 12,
                        color: item.isAdmin
                          ? Color.primary_100
                          : Color.yellow_20,
                      }}
                    >
                      {item.isAdmin ? 'Quản trị viên' : 'Tôi'}
                    </Text>
                    <Text
                      style={{
                        ...TextStyle.bodySmall,
                        alignSelf: 'flex-start',
                        paddingHorizontal: 12,
                        color: item.isAdmin
                          ? Color.primary_100
                          : Color.yellow_20,
                      }}
                    >
                      {formatDate(item.time)}
                    </Text>
                  </View>
                  <InputInformation
                    title="Nội dung"
                    information={item.message}
                  ></InputInformation>
                </View>              
                <View style={{ paddingTop: ScreenSize.height * 0.02 }} />
                </View>
            ))}

              { list[index].status == 2 ? null : <><View style={{...styles.center, borderColor: Color.yellow_20 }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <Text style={{...TextStyle.bodyLarge,
                        alignSelf: 'flex-start',
                        paddingHorizontal: 12,
                        color: Color.yellow_20,
                      }}>Tôi</Text>
                  </View>
                  <InputText
                  title={'Bình luận mới'}
                  placeholder={'Nhập bình luận'}
                  text={newCmtText}
                  output={setNewCmtText}
                  />
              </View>              
              <View style={{ paddingTop: ScreenSize.height * 0.3 }} /></>}
              
      </ScrollView>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingBottom: ScreenSize.height * 0.04,
        }}
      >
        <ButtonHalfWidth
          type={
            list[index].status != 2
              ? ButtonType.DEFAULT
              : ButtonType.DISABLE
          }
          content={'Gửi bình luận'}
          onPress={() => handleComment()}
        />
        <ButtonHalfWidth
          type={
            list[index].status != 2
              ? ButtonType.RED
              : ButtonType.DISABLE
          }
          content={'Đóng yêu cầu'}
          onPress={() => handleClose()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
    width: '100%',
    borderRadius: 10,
    borderColor: Color.primary_100,
    borderWidth: 1,
    paddingHorizontal: customSize(5),
    paddingVertical: customSize(5),
  },
  container: {
    position: 'relative',
    paddingHorizontal: (24 / 375) * ScreenSize.width,
    paddingTop: customSize(12),
    backgroundColor: Color.white_100,
    height: '100%',
    width: '100%',
  },
});

export default InquiryDetail;
