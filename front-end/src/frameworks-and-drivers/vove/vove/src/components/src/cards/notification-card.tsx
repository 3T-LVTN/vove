import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Color, ScreenSize } from '@front-end/shared/utils';
import { formatDate } from './time-format';

export interface NotificationCardProps {
  content: string;
  time: string;
  isToday: boolean;
}

export const NotificationCard = (props: NotificationCardProps) => {
  const vnTime = formatDate(props.time)
  return (
    <Pressable
      style={styles.button}
    >
      <View style={styles.content}>
        <View style={{ paddingLeft: ScreenSize.width * 0.04 }}>
          <Text style={styles.text}>{props.content}</Text>
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={ScreenSize.width * 0.05}
              color={Color.grey_100}
            ></MaterialCommunityIcons>
            <View style={{ paddingLeft: ScreenSize.width * 0.01 }}>
              <Text style={styles.text}>
                {vnTime}
              </Text>
            </View>
          </View>
        </View>
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
    width: (280 / 375) * ScreenSize.width,
  }
});
