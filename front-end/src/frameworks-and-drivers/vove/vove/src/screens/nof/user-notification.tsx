import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  Color,
  customSize,
  ScreenSize,
  TextStyle,
} from '@front-end/shared/utils';
import { ButtonFullWidth } from '@front-end/frameworks-and-drivers/vove/vove/src/components';
import { NotificationCard } from '../../components/src/cards/notification-card';
import { Divider } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { refreshNof } from '../../services/nof';

const isToday = (someDate: any) => {
  const today = new Date()
  return someDate.getDate() == today.getDate() &&
    someDate.getMonth() == today.getMonth() &&
    someDate.getFullYear() == today.getFullYear()
}

export function UserNotification({route, navigation}: any) {
  const [nofList, setNofList] = useState<any[]>([]);

  async function handleRefresh() {
    await refreshNof()
    const nofs = await AsyncStorage.getItem('nof')
    setNofList(JSON.parse(nofs!))
  }

  useEffect(() => {
    handleRefresh()
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: ScreenSize.height * 0.04 }}>
        <Text style={{ ...TextStyle.h3, color: Color.primary_100 }}>
          Danh sách thông báo
        </Text>
      </View>

      <ScrollView style={{ marginBottom: customSize(24) }}>
        <View style={{ marginTop: customSize(15) }} />

        <View>
          <View style={{ marginVertical: (8 / 812) * ScreenSize.height }}>
            <Text style={TextStyle.h3}>Hôm nay</Text>
          </View>
          {
            nofList
            .filter((nof) => isToday(new Date(nof.time)))
            .map((nof, index) => (
              <View key={index}>
                <NotificationCard
                  content={nof.message}
                  time={nof.time}
                  isToday={true}
                />
                <View style={{ marginTop: customSize(10) }} />
              </View>
            ))}
          <View style={{ padding: ScreenSize.height * 0.01 }}></View>
          <Divider style={{ backgroundColor: Color.grey_60, height: 1 }} />
          <View style={{ marginVertical: (16 / 812) * ScreenSize.height }}>
            <Text style={TextStyle.h3}>Trước đó</Text>
          </View>
          {
            nofList
            .filter((nof) => !isToday(new Date(nof.time)))
            .map((nof, index) => (
              <View key={index}>
                <NotificationCard
                  content={nof.message}
                  time={nof.time}
                  isToday={false}
                />
                <View style={{ marginTop: customSize(5) }} />
              </View>
            ))}
        </View>
      </ScrollView>

      <View style={{ paddingBottom: ScreenSize.height * 0.04 }}>
        <ButtonFullWidth
          content="Tải lại"
          onPress={() => handleRefresh()}
        ></ButtonFullWidth>
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
});

export default UserNotification;
