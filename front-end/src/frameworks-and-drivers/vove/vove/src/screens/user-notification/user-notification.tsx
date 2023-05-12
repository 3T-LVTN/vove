import React, {useState} from "react";
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {ButtonType, Color, customSize, ScreenSize, TextStyle} from "@front-end/shared/utils";
import {ButtonSmall} from "@front-end/frameworks-and-drivers/vove/vove/src/components";
import {NotificationCard} from "../../components/src/cards/notification-card";
import {Divider} from "react-native-paper";

const oneMin = 60 * 1000;
const oneHour = oneMin * 60;
const oneDay = oneHour * 24;

const notificationList = [
  {
    leftIcon: '',
    content: "Epidemic occurred in Ngoc's house area",
    time: new Date().getTime() - 55 * 1000, // 55 second
    isRead: false,
  },
  {
    leftIcon: '',
    content: "Epidemic occurred in Quang's house area",
    time: new Date().getTime() - 15 * oneMin, // 15 minute
    isRead: false,
  },
  {
    leftIcon: '',
    content: "High risk of dengue in My Company area",
    time: new Date().getTime() - 3 * oneHour, // 3 hour
    isRead: true,
  },
  {
    leftIcon: '',
    content: "Admin has closed your inquiry 'Add support for multiple languages'",
    time: new Date().getTime() - 16 * oneHour, // 16 hour
    isRead: false,
  },
  {
    leftIcon: '',
    content: "Admin has replied your inquiry 'Add support for multiple languages'",
    time: new Date().getTime() - 1 * oneDay, // 1 day
    isRead: true,
  },
  {
    leftIcon: '',
    content: "Admin has opened your inquiry 'Add support for multiple languages'",
    time: new Date().getTime() - 3 * oneDay, // 3 day
    isRead: true,
  },
  {
    leftIcon: '',
    content: "Sent your inquiry 'Add support for multiple languages'",
    time: new Date().getTime() - 25 * oneDay, // 25 day
    isRead: false,
  },
]

const filterTab = [
  {
    status: 'All'
  },
  {
    status: 'Unread'
  }
]

export interface UserNotificationProps {
  navigation: any;
}

export function UserNotification(props: UserNotificationProps) {
  const [status, setStatus] = useState('All')

  return (
    <SafeAreaView style={{backgroundColor: Color.white_100, height: "100%"}}>
      <ScrollView style={styles.container}>
        <View style={{marginTop: customSize(15)}}/>
        <View style={{flexDirection: 'row'}}>
          {
            filterTab.map(e => (
              <ButtonSmall type={status == e.status ? ButtonType.DEFAULT : ButtonType.OUTLINE} content={e.status}
                           onPress={() => setStatus(e.status)}></ButtonSmall>
            ))
          }
        </View>
        <View>
          <View style={{marginVertical: (16 / 812) * ScreenSize.height,}}>
            <Text style={TextStyle.h3}>Today</Text>
          </View>
          {notificationList.filter(newNof => Number(new Date()) - newNof.time < oneDay)
            .filter(readNof => status == 'Unread' ? readNof.isRead == false : readNof)
            .map(nof => (
              <View>
                <NotificationCard leftSymbol={nof.leftIcon} content={nof.content} time={nof.time} isRead={nof.isRead}/>
                <View style={{marginTop: customSize(10)}}/>
              </View>
            ))}
          <View style={{padding: ScreenSize.height * 0.01}}></View>
          <Divider style={{backgroundColor: Color.grey_60, height: 1}}/>
          <View style={{marginVertical: (16 / 812) * ScreenSize.height,}}>
            <Text style={TextStyle.h3}>Sooner</Text>
          </View>
          {notificationList.filter(oldNof => Number(new Date()) - oldNof.time >= oneDay)
            .filter(readNof => status == 'Unread' ? readNof.isRead == false : readNof)
            .map(nof => (
              <View>
                <NotificationCard leftSymbol={nof.leftIcon} content={nof.content} time={nof.time} isRead={nof.isRead}/>
                <View style={{marginTop: customSize(5)}}/>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  container: {
    position: "relative",
    paddingHorizontal: (24 / 375) * ScreenSize.width,
    paddingTop: customSize(12),
    backgroundColor: Color.white_100,
    height: "100%",
  },
});

export default UserNotification;
