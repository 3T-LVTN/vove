import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Color, ScreenSize } from '@front-end/shared/utils';

const oneMin = 60 * 1000;
const oneHour = oneMin * 60;
const oneDay = oneHour * 24;

export interface NotificationCardProps {
  leftSymbol: any;
  content: string;
  time: number;
  isRead: boolean;
  onPress?: any;
}

export const NotificationCard = (props: NotificationCardProps) => {
  const { leftSymbol, content, time, isRead, onPress } = props;
  const timeDiff = Number(new Date()) - time;
  let newTime, timeString;
  if (timeDiff < oneMin) {
    newTime = Math.round(timeDiff / 1000);
    timeString = newTime + ' secs ago';
  } else if (timeDiff < oneHour) {
    newTime = Math.round(timeDiff / oneMin);
    timeString = newTime + ' mins ago';
  } else if (timeDiff < oneDay) {
    newTime = Math.round(timeDiff / oneHour);
    timeString = newTime + ' hours ago';
  } else {
    newTime = Math.round(timeDiff / oneDay);
    timeString = newTime + ' days ago';
  }

  return (
    <Pressable
      style={isRead ? styles.button : styles.button2}
      onPress={onPress}
    >
      <View style={styles.content}>
        {/*<Avatar.Image*/}
        {/*  size={(40 / 375) * ScreenSize.width}*/}
        {/*  source={{uri: userImg}}*/}
        {/*/>*/}
        <View style={{ paddingLeft: ScreenSize.width * 0.04 }}>
          <Text style={styles.text}>{content}</Text>
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={ScreenSize.width * 0.05}
              color={isRead ? Color.grey_100 : Color.primary_100}
            ></MaterialCommunityIcons>
            <View style={{ paddingLeft: ScreenSize.width * 0.01 }}>
              <Text style={isRead ? styles.text : styles.text2}>
                {timeString}
              </Text>
            </View>
          </View>
        </View>
        <MaterialCommunityIcons
          name="circle-small"
          size={ScreenSize.width * 0.1}
          color={isRead ? Color.white_100 : Color.red_100}
          style={{ marginLeft: -ScreenSize.width * 0.11 }}
        ></MaterialCommunityIcons>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 15,
    width: (327 / 375) * ScreenSize.width,
    backgroundColor: Color.lightgrey_40,
    paddingVertical: (13 / 812) * ScreenSize.height,
  },
  button2: {
    borderRadius: 15,
    width: (327 / 375) * ScreenSize.width,
    backgroundColor: Color.light_100,
    paddingVertical: (13 / 812) * ScreenSize.height,
  },
  content: {
    paddingLeft: ScreenSize.width * 0.03,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: Color.dark_100,
    width: (251 / 375) * ScreenSize.width,
  },
  text2: {
    fontSize: 14,
    lineHeight: 20,
    color: Color.primary_100,
    width: (251 / 375) * ScreenSize.width,
  },
});
