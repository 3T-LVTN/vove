import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import {
  ButtonType,
  Color,
  ScreenSize,
  TextStyle,
} from '@front-end/shared/utils';

export interface ButtonHalfWidthProps {
  readonly type?: string;
  readonly content: string;
  readonly onPress: any;
}

export const ButtonHalfWidth = (props: ButtonHalfWidthProps) => {
  const { type, content, onPress } = props;
  const buttonColor =
    type == ButtonType.OUTLINE
      ? Color.white_100
      : type == ButtonType.RED
      ? Color.red_100
      : type == ButtonType.DISABLE
      ? Color.grey_40
      : Color.primary_100;
  const textColor =
    type == ButtonType.OUTLINE ? Color.primary_100 : Color.white_100;
  return (
    <Pressable
      style={{
        ...styles.button,
        backgroundColor: buttonColor,
        borderColor: textColor,
      }}
      onPress={onPress}
    >
      <Text style={{ ...TextStyle.h3, color: textColor }}>{content}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 45,
    width: (150 / 375) * ScreenSize.width,
    paddingVertical: (13 / 812) * ScreenSize.height,
    borderWidth: 1,
  },
});
