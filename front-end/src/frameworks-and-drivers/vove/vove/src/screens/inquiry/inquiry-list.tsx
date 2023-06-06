import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { InquirySummaryCard } from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import {
  Color,
  customSize,
  ScreenSize,
  TextStyle,
} from '@front-end/shared/utils';
import { ButtonOption } from '../../components/src/buttons/button-option';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonRow } from '../../components/src/buttons/button-row';

export function InquiryList({route, navigation}: any) {
  const [selected, setSelected] = useState(0);
  const [inqList, setInqList] = useState<any[]>([]);

  useEffect(() => {
    async function loadInquiries() {
      const inquiries = await AsyncStorage.getItem('inquiries')
      setInqList(JSON.parse(inquiries!))
    }
    loadInquiries()
  }, []);

  useEffect(() => {
    if (route.params?.update) {
      setInqList(route.params.updateList)
      route.params.update = null
    }
  }, [route.params?.update]);

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: ScreenSize.height * 0.04 }}>
        <Text style={{ ...TextStyle.h3, color: Color.primary_100 }}>
          Danh sách yêu cầu
        </Text>
        <View style={styles.func}>
          <ButtonOption
            iconName="message-draw"
            content="Tạo yêu cầu mới"
            onPress={() => navigation.navigate('NewInquiry')}
          />
        </View>
      </View>
      
      <View style={{ paddingTop: ScreenSize.height * 0.01 }}>
        <ButtonRow list={[
          { name: "Tất cả", width: 72 },
          { name: "Đang chờ", width: 85 },
          { name: "Đang mở", width: 85 },
          { name: "Đã đóng", width: 85 }
        ]} callBack={setSelected}/>

        <ScrollView style={{ marginBottom: customSize(24) }}>
          {
            inqList
              .filter((item) => selected != 0 ? item.status == selected - 1 : item )
              .map((item, index) => (
              <InquirySummaryCard
                key={index}
                navigation={navigation}
                inquiry={item}
              />
            ))
          }
          <View style={{ paddingTop: ScreenSize.height * 0.17 }} />
        </ScrollView>
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
  },
  func: {
    marginVertical: customSize(12),
  }
});

export default InquiryList;
