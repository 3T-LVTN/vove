import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import {ButtonType, Color, ScreenSize, TextStyle} from "@front-end/shared/utils";

export interface ButtonSmallProps {
  readonly type?: string;
  readonly content: string;
  readonly onPress: any;
}
export const ButtonSmall = (props: ButtonSmallProps) => {
  const { type, content, onPress } = props;
  const buttonColor =
    type === ButtonType.OUTLINE
      ? Color.white_100
      : type === ButtonType.DISABLE
        ? Color.grey_20
        : type === ButtonType.RED
          ? Color.red_100
          : Color.primary_100;
  const textColor =
    type === ButtonType.OUTLINE
      ? Color.primary_100
      : type === ButtonType.DISABLE
        ? Color.dark_40
        : Color.white_100;
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
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    paddingHorizontal: (13 / 812) * ScreenSize.height,
    alignSelf: "center",
    borderWidth: 1,
  },
});
