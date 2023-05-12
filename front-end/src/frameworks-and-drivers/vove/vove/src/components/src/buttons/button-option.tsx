import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {Color, ScreenSize, TextStyle} from "@front-end/shared/utils";

export interface ButtonOptionProps {
  readonly iconName: any;
  readonly content: string;
  readonly onPress?: any;
}

export const ButtonOption = (props: ButtonOptionProps) => {
  const { iconName, content, onPress } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={iconName}
            size={(13 / 375) * ScreenSize.width}
            color={Color.dark_100}
          />
        </View>
        <Text style={styles.text}>{content}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 60,
    width: (327 / 375) * ScreenSize.width,
    backgroundColor: Color.lightgrey_40,
    paddingVertical: (13 / 812) * ScreenSize.height,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: (44 / 375) * ScreenSize.width,
    width: (28 / 375) * ScreenSize.width,
    height: (28 / 375) * ScreenSize.width,
    backgroundColor: Color.grey_20,
    marginHorizontal: (32 / 375) * ScreenSize.width,
  },
  text: {
    ...TextStyle.h3,
    color: Color.dark_100,
    width: (251 / 375) * ScreenSize.width,
  },
});
