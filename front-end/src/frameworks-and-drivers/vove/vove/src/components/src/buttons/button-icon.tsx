import { StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {ButtonType, Color, ScreenSize} from "@front-end/shared/utils";

export interface ButtonIconProps {
  readonly type?: string;
  readonly onPress: any;
  readonly iconName: any;
  readonly customSize: number;
}

export const ButtonIcon = (props : ButtonIconProps) => {
  const { type, iconName, customSize, onPress } = props;
  const buttonColor =
    type == ButtonType.OUTLINE
      ? Color.white_100
      : type == ButtonType.DISABLE
        ? Color.grey_20
        : Color.primary_100;
  const iconColor =
    type == ButtonType.OUTLINE ? Color.primary_100 : Color.white_100;
  return (
    <Pressable
      style={{
        ...styles.button,
        backgroundColor: buttonColor,
        borderWidth: 1,
        borderColor:
          type == ButtonType.OUTLINE ? Color.primary_100 : buttonColor,
        width: customSize ? customSize * (40 / 375) * ScreenSize.width : (40 / 375) * ScreenSize.width,
        height: customSize ? customSize * (40 / 375) * ScreenSize.width : (40 / 375) * ScreenSize.width,
      }}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        name={iconName}
        size={customSize ? customSize * (18.95 / 375) * ScreenSize.width : (18.95 / 375) * ScreenSize.width}
        color={iconColor}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: (44 / 375) * ScreenSize.width,
    width: (40 / 375) * ScreenSize.width,
    height: (40 / 375) * ScreenSize.width,
  },
});
